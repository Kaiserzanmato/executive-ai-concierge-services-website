-- ─────────────────────────────────────────────────────────────
-- Executive AI Concierge Services — Supabase Schema
-- Run this SQL in your Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────

-- Extensions
create extension if not exists pgcrypto;

-- ── Enums ────────────────────────────────────────────────────

create type lead_status as enum (
  'new',
  'qualified',
  'high_value',
  'contacted',
  'converted',
  'archived'
);

create type lead_source as enum (
  'website_form',
  'ai_concierge_chat',
  'private_referral',
  'direct_email',
  'event',
  'partner'
);

-- ── Tables ───────────────────────────────────────────────────

create table if not exists public.executive_concierge_leads (
  id                         uuid primary key default gen_random_uuid(),
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now(),

  status                     lead_status not null default 'new',
  source                     lead_source not null default 'website_form',

  full_name                  text not null,
  email                      text not null,
  phone                      text,
  company                    text,
  role_title                 text,
  country                    text,
  preferred_contact_method   text not null default 'email',

  client_category            text not null,
  estimated_budget_range     text not null,
  desired_phase              text not null,
  urgency                    text not null,

  executive_context_summary  text not null,
  operational_pain_points    text not null,
  requested_outcome          text not null,

  consent_privacy            boolean not null default false,
  consent_contact            boolean not null default false,

  -- SHA-256 hash of lowercased, trimmed email for dedup without storing plaintext
  email_hash                 text generated always as (
    encode(digest(lower(trim(email)), 'sha256'), 'hex')
  ) stored,

  lead_score                 int not null default 0,
  high_value_flag            boolean not null default false,

  encrypted_payload          jsonb,
  encryption_mode            text not null default 'server_encrypted',

  ip_region                  text,
  user_agent                 text,
  referrer                   text,
  utm_source                 text,
  utm_medium                 text,
  utm_campaign               text,

  internal_notes             text,
  assigned_to                text
);

create table if not exists public.executive_concierge_lead_events (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid references public.executive_concierge_leads(id) on delete cascade,
  created_at      timestamptz not null default now(),
  event_type      text not null,
  event_payload   jsonb not null default '{}'::jsonb
);

create table if not exists public.ai_concierge_sessions (
  id                       uuid primary key default gen_random_uuid(),
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  session_key              text not null unique,
  visitor_fingerprint_hash text,
  lead_id                  uuid references public.executive_concierge_leads(id) on delete set null,
  high_value_flag          boolean not null default false,
  handoff_requested        boolean not null default false,
  crm_alert_sent           boolean not null default false
);

create table if not exists public.ai_concierge_messages (
  id                uuid primary key default gen_random_uuid(),
  session_id        uuid references public.ai_concierge_sessions(id) on delete cascade,
  created_at        timestamptz not null default now(),
  role              text not null check (role in ('visitor', 'assistant', 'system')),
  message           text not null,
  intent            text,
  phase_interest    text,
  lead_signal_score int not null default 0,
  metadata          jsonb not null default '{}'::jsonb
);

-- ── Indexes ──────────────────────────────────────────────────

create index if not exists idx_exec_leads_status_created
  on public.executive_concierge_leads(status, created_at desc);

create index if not exists idx_exec_leads_high_value
  on public.executive_concierge_leads(high_value_flag, created_at desc);

create index if not exists idx_exec_leads_email_hash
  on public.executive_concierge_leads(email_hash);

create index if not exists idx_chat_sessions_key
  on public.ai_concierge_sessions(session_key);

create index if not exists idx_chat_messages_session
  on public.ai_concierge_messages(session_id, created_at asc);

-- ── Updated-at trigger ────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_exec_leads_updated_at on public.executive_concierge_leads;
create trigger trg_exec_leads_updated_at
  before update on public.executive_concierge_leads
  for each row execute function public.set_updated_at();

drop trigger if exists trg_chat_sessions_updated_at on public.ai_concierge_sessions;
create trigger trg_chat_sessions_updated_at
  before update on public.ai_concierge_sessions
  for each row execute function public.set_updated_at();

-- ── Row Level Security ────────────────────────────────────────
-- Production: all reads/writes come through server-side service role only.
-- No browser client ever touches these tables directly.

alter table public.executive_concierge_leads        enable row level security;
alter table public.executive_concierge_lead_events  enable row level security;
alter table public.ai_concierge_sessions            enable row level security;
alter table public.ai_concierge_messages            enable row level security;

-- Revoke all direct access from anon and authenticated browser roles
revoke all on public.executive_concierge_leads        from anon, authenticated;
revoke all on public.executive_concierge_lead_events  from anon, authenticated;
revoke all on public.ai_concierge_sessions            from anon, authenticated;
revoke all on public.ai_concierge_messages            from anon, authenticated;

-- Deny-all policies (service_role bypasses RLS automatically in Supabase)
create policy "No public select on executive leads"
  on public.executive_concierge_leads for select
  to anon, authenticated using (false);

create policy "No public insert on executive leads"
  on public.executive_concierge_leads for insert
  to anon, authenticated with check (false);

create policy "No public update on executive leads"
  on public.executive_concierge_leads for update
  to anon, authenticated using (false) with check (false);

create policy "No public delete on executive leads"
  on public.executive_concierge_leads for delete
  to anon, authenticated using (false);

create policy "No public access on lead events"
  on public.executive_concierge_lead_events for select
  to anon, authenticated using (false);

create policy "No public access on concierge sessions"
  on public.ai_concierge_sessions for select
  to anon, authenticated using (false);

create policy "No public access on concierge messages"
  on public.ai_concierge_messages for select
  to anon, authenticated using (false);
