import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { cleanText, isEmail } from "@/lib/sanitize";
import { loadReportData } from "@/lib/assessmentReportData";
import {
  generatePdfReport,
  generateMarkdownReport,
  generateTextReport,
  generateCsvSummary,
} from "@/lib/assessmentReports";

const VALID_FORMATS = new Set(["pdf", "md", "txt", "csv"]);

const FORMAT_EXT: Record<string, string> = {
  pdf: "pdf",
  md: "md",
  txt: "txt",
  csv: "csv",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured. Please download the report instead." },
        { status: 500 }
      );
    }

    const raw = await req.json();
    const resumeToken = cleanText(raw.resumeToken, 200);
    const format = cleanText(raw.format, 10) || "pdf";

    if (!resumeToken || !VALID_FORMATS.has(format)) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const data = await loadReportData(resumeToken);
    if (!data) {
      return NextResponse.json({ ok: false, error: "Assessment results not found." }, { status: 404 });
    }

    const recipientEmail = cleanText(raw.email, 240).toLowerCase() || data.respondent.email || "";
    if (!isEmail(recipientEmail)) {
      return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
    }

    const ext = FORMAT_EXT[format];
    let content: Buffer | string;

    if (format === "pdf") {
      content = await generatePdfReport(data);
    } else if (format === "md") {
      content = generateMarkdownReport(data);
    } else if (format === "txt") {
      content = generateTextReport(data);
    } else {
      content = generateCsvSummary(data);
    }

    const resend = new Resend(apiKey);

    const attachmentContent = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf-8");

    const { error } = await resend.emails.send({
      from: "Executive AI Concierge <assessment@executiveaiconcierge.com>",
      to: recipientEmail,
      subject: "Your Executive Operations Assessment Report",
      html: `<p>Thank you for completing the Executive Operations Assessment. Your personalized report is attached.</p>`,
      attachments: [
        {
          filename: `executive-operations-assessment.${ext}`,
          content: attachmentContent,
        },
      ],
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ ok: false, error: "Unable to send the report email." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Report sent successfully." });
  } catch (err) {
    console.error("Assessment email-report unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unable to send the report." }, { status: 500 });
  }
}
