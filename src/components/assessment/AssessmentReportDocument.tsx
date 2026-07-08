import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ReportData } from "@/lib/assessmentReports";

const PHASE_LABELS: Record<number, string> = {
  1: "Phase 1 — Productivity Hub",
  2: "Phase 2 — AI Executive Assistant Integration",
  3: "Phase 3 — Personalized AI Concierge",
  4: "Phase 4 — White-Glove Implementation",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#050505",
    color: "#F8F6F0",
    padding: 48,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  eyebrow: {
    color: "#D8B76A",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#F8F6F0",
  },
  meta: {
    color: "#A7A7A7",
    fontSize: 10,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#D8B76A",
    marginTop: 20,
    marginBottom: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statBox: {
    width: "31%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#2A2A30",
    borderRadius: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#F8F6F0",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    color: "#A7A7A7",
  },
  listItem: {
    fontSize: 11,
    color: "#EEEAE0",
    marginBottom: 4,
  },
  recommendationBox: {
    marginTop: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D8B76A",
    borderRadius: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#D8B76A",
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 48,
    right: 48,
    fontSize: 8,
    color: "#A7A7A7",
    textAlign: "center",
  },
});

export function AssessmentReportDocument({ data }: { data: ReportData }) {
  const { respondent, scores, generatedAt } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Executive AI Concierge Services</Text>
        <Text style={styles.title}>Executive Operations Assessment Report</Text>
        <Text style={styles.meta}>
          Prepared for {respondent.fullName || "Executive"} · {new Date(generatedAt).toLocaleDateString()}
          {respondent.executiveType ? ` · ${respondent.executiveType}` : ""}
          {respondent.industry ? ` · ${respondent.industry}` : ""}
        </Text>

        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{scores.operationsScore}/100</Text>
            <Text style={styles.statLabel}>Executive Operations Score</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{scores.aiReadinessScore}/100</Text>
            <Text style={styles.statLabel}>AI Readiness Score</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{scores.hoursRecoverablePerWeek}</Text>
            <Text style={styles.statLabel}>Hours Recoverable / Week</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top Operational Bottlenecks</Text>
        {scores.topBottlenecks.length > 0 ? (
          scores.topBottlenecks.map((b, i) => (
            <Text key={i} style={styles.listItem}>
              {i + 1}. {b}
            </Text>
          ))
        ) : (
          <Text style={styles.listItem}>None identified.</Text>
        )}

        <Text style={styles.sectionTitle}>Highest ROI Automation Opportunities</Text>
        {scores.topAutomationOpportunities.length > 0 ? (
          scores.topAutomationOpportunities.map((o, i) => (
            <Text key={i} style={styles.listItem}>
              {i + 1}. {o}
            </Text>
          ))
        ) : (
          <Text style={styles.listItem}>None identified.</Text>
        )}

        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationText}>{PHASE_LABELS[scores.recommendedPhase]}</Text>
          <Text style={styles.listItem}>
            {scores.recommendConsultation
              ? "We recommend a private consultation to discuss implementation."
              : "Review the recommended phase details on our services pages."}
          </Text>
        </View>

        <Text style={styles.footer}>
          Executive AI Concierge Services — Confidential Assessment Report — Generated{" "}
          {new Date(generatedAt).toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
}
