"use client";

import { useState } from "react";

export function ResultsActions({ resumeToken }: { resumeToken: string }) {
  const [consultOpen, setConsultOpen] = useState(false);
  const [consultStatus, setConsultStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactEmail, setContactEmail] = useState("");
  const [timing, setTiming] = useState("Within a week");
  const [notes, setNotes] = useState("");

  async function handleConsultationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setConsultStatus("sending");
    try {
      const res = await fetch("/api/assessment/consultation-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          resumeToken,
          preferredContactMethod: contactEmail,
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
              <input
                type="email"
                required
                className="form-field"
                placeholder="your@organization.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <select className="form-field" value={timing} onChange={(e) => setTiming(e.target.value)}>
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
