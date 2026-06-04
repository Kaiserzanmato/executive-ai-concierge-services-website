import { google } from "googleapis";

export type SheetLeadInput = {
  leadId: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  roleTitle?: string;
  country?: string;
  clientCategory: string;
  estimatedBudgetRange: string;
  desiredPhase: string;
  urgency: string;
  executiveContextSummary: string;
  operationalPainPoints: string;
  requestedOutcome: string;
  leadScore: number;
  highValue: boolean;
  source: string;
};

export async function appendLeadToGoogleSheet(input: SheetLeadInput): Promise<void> {
  if (process.env.USE_GOOGLE_SHEETS_FALLBACK !== "true") return;

  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: process.env.GOOGLE_SHEET_RANGE || "ExecutiveAILeads!A:Q",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          input.leadId,
          input.createdAt,
          input.fullName,
          input.email,
          input.phone || "",
          input.company || "",
          input.roleTitle || "",
          input.country || "",
          input.clientCategory,
          input.estimatedBudgetRange,
          input.desiredPhase,
          input.urgency,
          input.executiveContextSummary,
          input.operationalPainPoints,
          input.requestedOutcome,
          String(input.leadScore),
          input.highValue ? "High Value" : "Standard",
          input.source,
        ],
      ],
    },
  });
}
