-- ─────────────────────────────────────────────────────────────
-- Executive Operations Assessment Platform — Supabase Schema
-- Run this AFTER schema.sql (reuses pgcrypto + set_updated_at()).
-- ─────────────────────────────────────────────────────────────

-- ── Tables ───────────────────────────────────────────────────

create table if not exists public.executive_concierge_assessment_respondents (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  resume_token        text not null unique,

  full_name           text,
  email               text,
  email_hash          text generated always as (
    encode(digest(lower(trim(coalesce(email, ''))), 'sha256'), 'hex')
  ) stored,

  executive_type      text,
  industry            text,
  company_size        text,
  income_range        text,

  status              text not null default 'in_progress'
                        check (status in ('in_progress', 'completed', 'abandoned')),
  current_step        int not null default 1,
  completed_at        timestamptz
);

create table if not exists public.executive_concierge_assessment_responses (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  respondent_id  uuid not null references public.executive_concierge_assessment_respondents(id) on delete cascade,
  section_key    text not null,
  answers        jsonb not null default '{}'::jsonb,

  unique (respondent_id, section_key)
);

create table if not exists public.executive_concierge_assessment_scores (
  id                             uuid primary key default gen_random_uuid(),
  created_at                     timestamptz not null default now(),

  respondent_id                  uuid not null unique references public.executive_concierge_assessment_respondents(id) on delete cascade,

  operations_score               int not null,
  ai_readiness_score             int not null,
  hours_recoverable_per_week     numeric(5,1) not null,
  top_bottlenecks                jsonb not null default '[]'::jsonb,
  top_automation_opportunities   jsonb not null default '[]'::jsonb,
  recommended_phase              int not null check (recommended_phase between 1 and 4),
  recommend_consultation         boolean not null default false
);

create table if not exists public.executive_concierge_consultation_requests (
  id                       uuid primary key default gen_random_uuid(),
  created_at               timestamptz not null default now(),

  respondent_id            uuid not null references public.executive_concierge_assessment_respondents(id) on delete cascade,
  preferred_contact_method text,
  preferred_timing         text,
  notes                    text
);

create table if not exists public.executive_concierge_assessment_rate_limits (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  ip_hash     text not null
);

-- ── Indexes ──────────────────────────────────────────────────

create index if not exists idx_assessment_respondents_status_created
  on public.executive_concierge_assessment_respondents(status, created_at desc);

create index if not exists idx_assessment_respondents_resume_token
  on public.executive_concierge_assessment_respondents(resume_token);

create index if not exists idx_assessment_responses_respondent
  on public.executive_concierge_assessment_responses(respondent_id);

create index if not exists idx_assessment_rate_limits_ip_time
  on public.executive_concierge_assessment_rate_limits(ip_hash, created_at desc);

-- ── Updated-at triggers (reuse public.set_updated_at() from schema.sql) ──

drop trigger if exists trg_assessment_respondents_updated_at on public.executive_concierge_assessment_respondents;
create trigger trg_assessment_respondents_updated_at
  before update on public.executive_concierge_assessment_respondents
  for each row execute function public.set_updated_at();

drop trigger if exists trg_assessment_responses_updated_at on public.executive_concierge_assessment_responses;
create trigger trg_assessment_responses_updated_at
  before update on public.executive_concierge_assessment_responses
  for each row execute function public.set_updated_at();

-- ── Row Level Security ────────────────────────────────────────
-- Production: all reads/writes come through server-side service role only.
-- No browser client ever touches these tables directly.

alter table public.executive_concierge_assessment_respondents        enable row level security;
alter table public.executive_concierge_assessment_responses          enable row level security;
alter table public.executive_concierge_assessment_scores              enable row level security;
alter table public.executive_concierge_consultation_requests          enable row level security;
alter table public.executive_concierge_assessment_rate_limits         enable row level security;

revoke all on public.executive_concierge_assessment_respondents       from anon, authenticated;
revoke all on public.executive_concierge_assessment_responses         from anon, authenticated;
revoke all on public.executive_concierge_assessment_scores            from anon, authenticated;
revoke all on public.executive_concierge_consultation_requests        from anon, authenticated;
revoke all on public.executive_concierge_assessment_rate_limits       from anon, authenticated;

-- Deny-all policies (service_role bypasses RLS automatically in Supabase)

create policy "No public select on assessment respondents"
  on public.executive_concierge_assessment_respondents for select
  to anon, authenticated using (false);
create policy "No public insert on assessment respondents"
  on public.executive_concierge_assessment_respondents for insert
  to anon, authenticated with check (false);
create policy "No public update on assessment respondents"
  on public.executive_concierge_assessment_respondents for update
  to anon, authenticated using (false) with check (false);
create policy "No public delete on assessment respondents"
  on public.executive_concierge_assessment_respondents for delete
  to anon, authenticated using (false);

create policy "No public access on assessment responses"
  on public.executive_concierge_assessment_responses for select
  to anon, authenticated using (false);

create policy "No public access on assessment scores"
  on public.executive_concierge_assessment_scores for select
  to anon, authenticated using (false);

create policy "No public access on consultation requests"
  on public.executive_concierge_consultation_requests for select
  to anon, authenticated using (false);

create policy "No public access on assessment rate limits"
  on public.executive_concierge_assessment_rate_limits for select
  to anon, authenticated using (false);
