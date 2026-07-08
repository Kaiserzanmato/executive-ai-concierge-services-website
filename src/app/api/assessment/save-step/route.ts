import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { cleanText } from "@/lib/sanitize";
import { ASSESSMENT_SECTIONS, stepIndexForSection } from "@/lib/assessmentSections";

const VALID_SECTION_KEYS = new Set(ASSESSMENT_SECTIONS.map((s) => s.key));
const MAX_ANSWERS_JSON_SIZE = 20_000;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const raw = await req.json();

    const resumeToken = cleanText(raw.resumeToken, 200);
    const sectionKey = cleanText(raw.sectionKey, 100);
    const answers = raw.answers;

    if (!resumeToken || !sectionKey || !VALID_SECTION_KEYS.has(sectionKey as (typeof ASSESSMENT_SECTIONS)[number]["key"])) {
      return NextResponse.json({ ok: false, error: "Invalid section or resume token." }, { status: 400 });
    }

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ ok: false, error: "Answers payload is required." }, { status: 400 });
    }

    const answersJson = JSON.stringify(answers);
    if (answersJson.length > MAX_ANSWERS_JSON_SIZE) {
      return NextResponse.json({ ok: false, error: "Answers payload too large." }, { status: 400 });
    }

    const db = getSupabaseAdmin();

    const { data: respondent, error: lookupError } = await db
      .from("executive_concierge_assessment_respondents")
      .select("id")
      .eq("resume_token", resumeToken)
      .single();

    if (lookupError || !respondent) {
      return NextResponse.json({ ok: false, error: "Assessment session not found." }, { status: 404 });
    }

    const { error: upsertError } = await db
      .from("executive_concierge_assessment_responses")
      .upsert(
        { respondent_id: respondent.id, section_key: sectionKey, answers },
        { onConflict: "respondent_id,section_key" }
      );

    if (upsertError) {
      console.error("Assessment save-step upsert error:", upsertError.message);
      return NextResponse.json({ ok: false, error: "Unable to save your progress." }, { status: 500 });
    }

    // Extract profile fields for easy querying if this is the executive_profile section
    const profileUpdate: Record<string, string | null> = {};
    if (sectionKey === "executive_profile" && answers && typeof answers === "object") {
      const a = answers as Record<string, unknown>;
      if (typeof a.fullName === "string") profileUpdate.full_name = cleanText(a.fullName, 160);
      if (typeof a.email === "string") profileUpdate.email = cleanText(a.email, 240).toLowerCase();
      if (typeof a.executiveType === "string") profileUpdate.executive_type = cleanText(a.executiveType, 120);
      if (typeof a.industry === "string") profileUpdate.industry = cleanText(a.industry, 120);
      if (typeof a.companySize === "string") profileUpdate.company_size = cleanText(a.companySize, 120);
      if (typeof a.incomeRange === "string") profileUpdate.income_range = cleanText(a.incomeRange, 120);
    }

    await db
      .from("executive_concierge_assessment_respondents")
      .update({ current_step: stepIndexForSection(sectionKey), ...profileUpdate })
      .eq("id", respondent.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Assessment save-step unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error saving progress." }, { status: 500 });
  }
}
