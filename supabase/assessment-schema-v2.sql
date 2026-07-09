-- ─────────────────────────────────────────────────────────────
-- Executive Operations Assessment Platform — Schema Update v2
-- Adds fields needed for the rewritten Step 10 "Personalized
-- Recommendation" (recommended service/s + suggested next step).
-- Run this AFTER assessment-schema.sql. Additive only — no
-- destructive changes, existing rows get sane defaults.
-- ─────────────────────────────────────────────────────────────

alter table public.executive_concierge_assessment_scores
  add column if not exists recommended_services jsonb not null default '[]'::jsonb,
  add column if not exists suggested_next_step text not null default '';
