import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import type { AssessmentScoreResult } from "./assessmentScoring";
import { AssessmentReportDocument } from "@/components/assessment/AssessmentReportDocument";

export interface ReportData {
  respondent: {
    fullName?: string;
    email?: string;
    executiveType?: string;
    industry?: string;
    companySize?: string;
    incomeRange?: string;
  };
  scores: AssessmentScoreResult;
  generatedAt: string;
}

export const PHASE_LABELS: Record<number, string> = {
  1: "Phase 1 — Productivity Hub",
  2: "Phase 2 — AI Executive Assistant Integration",
  3: "Phase 3 — Personalized AI Concierge",
  4: "Phase 4 — White-Glove Implementation",
};

export async function generatePdfReport(data: ReportData): Promise<Buffer> {
  const element = createElement(AssessmentReportDocument, { data }) as Parameters<typeof renderToBuffer>[0];
  return renderToBuffer(element);
}

export function generateMarkdownReport(data: ReportData): string {
  const { respondent, scores, generatedAt } = data;

  return `# Executive Operations Assessment Report

**Prepared for:** ${respondent.fullName || "Executive"}
**Date:** ${new Date(generatedAt).toLocaleDateString()}
**Executive Type:** ${respondent.executiveType || "Not specified"}
**Industry:** ${respondent.industry || "Not specified"}

---

## Scores

- **Executive Operations Score:** ${scores.operationsScore}/100
- **AI Readiness Score:** ${scores.aiReadinessScore}/100
- **Estimated Hours Recoverable Per Week:** ${scores.hoursRecoverablePerWeek}

## Top Operational Bottlenecks

${scores.topBottlenecks.map((b, i) => `${i + 1}. ${b}`).join("\n") || "None identified."}

## Highest ROI Automation Opportunities

${scores.topAutomationOpportunities.map((o, i) => `${i + 1}. ${o}`).join("\n") || "None identified."}

## Recommended Services

${scores.recommendedServices.map((s, i) => `${i + 1}. ${s}`).join("\n") || "None identified."}

## Recommendation

**${PHASE_LABELS[scores.recommendedPhase]}**

${scores.recommendConsultation ? "We recommend a private consultation to discuss implementation." : "Review the recommended phase details on our services pages."}

**Suggested next step:** ${scores.suggestedNextStep}

---

*Executive AI Concierge Services — Confidential Assessment Report*
`;
}

export function generateTextReport(data: ReportData): string {
  const { respondent, scores, generatedAt } = data;

  return `EXECUTIVE OPERATIONS ASSESSMENT REPORT
========================================

Prepared for: ${respondent.fullName || "Executive"}
Date: ${new Date(generatedAt).toLocaleDateString()}
Executive Type: ${respondent.executiveType || "Not specified"}
Industry: ${respondent.industry || "Not specified"}

SCORES
------
Executive Operations Score: ${scores.operationsScore}/100
AI Readiness Score: ${scores.aiReadinessScore}/100
Estimated Hours Recoverable Per Week: ${scores.hoursRecoverablePerWeek}

TOP OPERATIONAL BOTTLENECKS
---------------------------
${scores.topBottlenecks.map((b, i) => `${i + 1}. ${b}`).join("\n") || "None identified."}

HIGHEST ROI AUTOMATION OPPORTUNITIES
-------------------------------------
${scores.topAutomationOpportunities.map((o, i) => `${i + 1}. ${o}`).join("\n") || "None identified."}

RECOMMENDED SERVICES
--------------------
${scores.recommendedServices.map((s, i) => `${i + 1}. ${s}`).join("\n") || "None identified."}

RECOMMENDATION
--------------
${PHASE_LABELS[scores.recommendedPhase]}

${scores.recommendConsultation ? "We recommend a private consultation to discuss implementation." : "Review the recommended phase details on our services pages."}

Suggested next step: ${scores.suggestedNextStep}

---
Executive AI Concierge Services — Confidential Assessment Report
`;
}

export function generateCsvSummary(data: ReportData): string {
  const { respondent, scores, generatedAt } = data;

  const headers = [
    "generated_at",
    "full_name",
    "email",
    "executive_type",
    "industry",
    "operations_score",
    "ai_readiness_score",
    "hours_recoverable_per_week",
    "top_bottlenecks",
    "top_automation_opportunities",
    "recommended_phase",
    "recommend_consultation",
    "recommended_services",
    "suggested_next_step",
  ];

  const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const row = [
    generatedAt,
    respondent.fullName || "",
    respondent.email || "",
    respondent.executiveType || "",
    respondent.industry || "",
    String(scores.operationsScore),
    String(scores.aiReadinessScore),
    String(scores.hoursRecoverablePerWeek),
    scores.topBottlenecks.join("; "),
    scores.topAutomationOpportunities.join("; "),
    PHASE_LABELS[scores.recommendedPhase],
    String(scores.recommendConsultation),
    scores.recommendedServices.join("; "),
    scores.suggestedNextStep,
  ].map(escapeCsv);

  return `${headers.join(",")}\n${row.join(",")}\n`;
}
