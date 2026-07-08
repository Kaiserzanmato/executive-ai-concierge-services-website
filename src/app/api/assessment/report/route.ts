import { NextRequest, NextResponse } from "next/server";
import { cleanText } from "@/lib/sanitize";
import { loadReportData } from "@/lib/assessmentReportData";
import {
  generatePdfReport,
  generateMarkdownReport,
  generateTextReport,
  generateCsvSummary,
} from "@/lib/assessmentReports";

const VALID_FORMATS = new Set(["pdf", "md", "txt", "csv"]);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const raw = await req.json();
    const resumeToken = cleanText(raw.resumeToken, 200);
    const format = cleanText(raw.format, 10);

    if (!resumeToken || !VALID_FORMATS.has(format)) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const data = await loadReportData(resumeToken);
    if (!data) {
      return NextResponse.json({ ok: false, error: "Assessment results not found." }, { status: 404 });
    }

    const filenameBase = "executive-operations-assessment";

    if (format === "pdf") {
      const buffer = await generatePdfReport(data);
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "content-type": "application/pdf",
          "content-disposition": `attachment; filename="${filenameBase}.pdf"`,
        },
      });
    }

    if (format === "md") {
      return new NextResponse(generateMarkdownReport(data), {
        headers: {
          "content-type": "text/markdown",
          "content-disposition": `attachment; filename="${filenameBase}.md"`,
        },
      });
    }

    if (format === "txt") {
      return new NextResponse(generateTextReport(data), {
        headers: {
          "content-type": "text/plain",
          "content-disposition": `attachment; filename="${filenameBase}.txt"`,
        },
      });
    }

    return new NextResponse(generateCsvSummary(data), {
      headers: {
        "content-type": "text/csv",
        "content-disposition": `attachment; filename="${filenameBase}.csv"`,
      },
    });
  } catch (err) {
    console.error("Assessment report unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unable to generate report." }, { status: 500 });
  }
}
