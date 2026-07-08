import { createHash } from "crypto";
import { getSupabaseAdmin } from "./supabaseServer";

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export interface RateLimitOptions {
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string;
}

/**
 * Backend-agnostic contract. Call sites depend only on this interface, so the
 * Supabase-backed implementation below can be swapped for an Upstash Redis
 * (or any other) implementation later without changing any API route.
 */
export interface RateLimiter {
  check(key: string, options: RateLimitOptions): Promise<RateLimitResult>;
}

/**
 * Fixed-window rate limiter backed by Supabase. Stores only a hashed key
 * (never a raw IP) with a timestamp — see executive_concierge_assessment_rate_limits.
 */
class SupabaseRateLimiter implements RateLimiter {
  async check(key: string, { limit, windowSeconds }: RateLimitOptions): Promise<RateLimitResult> {
    const db = getSupabaseAdmin();
    const now = Date.now();
    const windowStartIso = new Date(now - windowSeconds * 1000).toISOString();
    const resetAt = new Date(now + windowSeconds * 1000).toISOString();

    const { count } = await db
      .from("executive_concierge_assessment_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", key)
      .gte("created_at", windowStartIso);

    const used = count ?? 0;

    if (used >= limit) {
      return { allowed: false, remaining: 0, resetAt };
    }

    await db.from("executive_concierge_assessment_rate_limits").insert({ ip_hash: key });

    return { allowed: true, remaining: Math.max(0, limit - used - 1), resetAt };
  }
}

let rateLimiter: RateLimiter | null = null;

/**
 * Returns the active rate limiter. To move to Upstash Redis later, replace
 * the implementation instantiated here (e.g. `new UpstashRateLimiter()`) —
 * every call site uses only the RateLimiter.check() contract and needs no changes.
 */
export function getRateLimiter(): RateLimiter {
  if (!rateLimiter) {
    rateLimiter = new SupabaseRateLimiter();
  }
  return rateLimiter;
}
