"use client";

import { useState } from "react";

type Format = "pdf" | "md" | "txt" | "csv";
const FORMATS: { format: Format; label: string }[] = [
  { format: "pdf", label: "PDF" },
  { format: "md", label: "Markdown" },
  { format: "txt", label: "Text" },
  { format: "csv", label: "CSV" },
];

export function ResultsActions({ resumeToken }: { resumeToken: string }) {
  const [downloading, setDownloading] = useState<Format | null>(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [consultOpen, setConsultOpen] = useState(false);
  const [consultStatus, setConsultStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactMethod, setContactMethod] = useState("Email");
  const [timing, setTiming] = useState("As soon as possible");
  const [notes, setNotes] = useState("");

  async function handleDownload(format: Format) {
    setDownloading(format);
    try {
      const res = await fetch("/api/assessment/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resumeToken, format }),
      });
      if (!res.ok) throw new Error("Download failed.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `executive-operations-assessment.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silent — button remains available for retry
    } finally {
      setDownloading(null);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailStatus("sending");
    setEmailError(null);
    try {
      const res = await fetch("/api/assessment/email-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resumeToken, format: "pdf", email }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Unable to send report.");
      setEmailStatus("sent");
    } catch (err) {
      setEmailStatus("error");
      setEmailError((err as Error).message);
    }
  }

  async function handleConsultationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setConsultStatus("sending");
    try {
      const res = await fetch("/api/assessment/consultation-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          resumeToken,
          preferredContactMethod: contactMethod,
          preferredTiming: timing,
          notes,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Unable to submit request.");
      setConsultStatus("sent");
    } catch {
      setConsultStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      {/* Download buttons */}
      <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
        <h3 className="text-lg font-semibold text-ivory-50 mb-4">Download your report</h3>
        <div className="flex flex-wrap gap-3">
          {FORMATS.map(({ format, label }) => (
            <button
              key={format}
              onClick={() => handleDownload(format)}
              disabled={downloading === format}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-platinum-100 hover:bg-white/5 transition-colors disabled:opacity-60"
            >
              {downloading === format ? "Preparing..." : `Download ${label}`}
            </button>
          ))}
        </div>
      </div>

      {/* Email report */}
      <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
        <h3 className="text-lg font-semibold text-ivory-50 mb-4">Email me this report</h3>
        {emailStatus === "sent" ? (
          <p role="status" className="text-sm text-signal-green">
            Your report has been sent.
          </p>
        ) : (
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              className="form-field flex-1"
              placeholder="you@yourorganization.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={emailStatus === "sending"}
              className="rounded-full bg-ivory-50 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-colors disabled:opacity-60 flex-shrink-0"
            >
              {emailStatus === "sending" ? "Sending..." : "Send Report"}
            </button>
          </form>
        )}
        {emailStatus === "error" && (
          <p role="alert" className="mt-2 text-sm text-signal-red">
            {emailError}
          </p>
        )}
      </div>

      {/* Consultation CTA */}
      <div className="rounded-executive border border-gold-300/30 bg-white/[0.03] p-7">
        <h3 className="text-lg font-semibold text-ivory-50 mb-2">Request a private consultation</h3>
        <p className="text-sm text-platinum-200 mb-4">
          Discuss your results with a qualified advisor and explore your recommended phase in detail.
        </p>
        {consultStatus === "sent" ? (
          <p role="status" className="text-sm text-signal-green">
            Your consultation request has been received. We will reach out shortly.
          </p>
        ) : consultOpen ? (
          <form onSubmit={handleConsultationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select className="form-field" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)}>
                <option>Email</option>
                <option>Phone</option>
                <option>Signal</option>
                <option>Secure message</option>
              </select>
              <select className="form-field" value={timing} onChange={(e) => setTiming(e.target.value)}>
                <option>As soon as possible</option>
                <option>Within a week</option>
                <option>Within a month</option>
                <option>No preference</option>
              </select>
            </div>
            <textarea
              className="form-field resize-none"
              rows={3}
              placeholder="Optional context..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              type="submit"
              disabled={consultStatus === "sending"}
              className="rounded-full bg-ivory-50 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-colors disabled:opacity-60"
            >
              {consultStatus === "sending" ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        ) : (
          <button
            onClick={() => setConsultOpen(true)}
            className="rounded-full bg-ivory-50 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-colors"
          >
            Request Consultation
          </button>
        )}
      </div>
    </div>
  );
}
