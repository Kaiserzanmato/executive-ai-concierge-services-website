import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { getRateLimiter, hashIp } from "@/lib/rateLimiter";

const ASSESSMENT_START_RATE_LIMIT = { limit: 5, windowSeconds: 60 * 60 };

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = hashIp(ip);

    const rateLimitResult = await getRateLimiter().check(ipHash, ASSESSMENT_START_RATE_LIMIT);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "You've reached the limit of 5 assessment attempts per hour. Please try again later.",
        },
        { status: 429 }
      );
    }

    const resumeToken =
      typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);

    const { data, error } = await getSupabaseAdmin()
      .from("executive_concierge_assessment_respondents")
      .insert({ resume_token: resumeToken, status: "in_progress", current_step: 1 })
      .select("id, resume_token")
      .single();

    if (error || !data) {
      console.error("Assessment start error:", error?.message);
      return NextResponse.json(
        { ok: false, error: "Unable to start assessment. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, resumeToken: data.resume_token, respondentId: data.id });
  } catch (err) {
    console.error("Assessment start unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error starting assessment." }, { status: 500 });
  }
}
