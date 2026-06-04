"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

type Message = {
  role: "visitor" | "assistant";
  text: string;
};

const HIGH_VALUE_SIGNALS = [
  "uhnw",
  "family office",
  "celebrity",
  "founder",
  "ceo",
  "chief of staff",
  "private office",
  "white-glove",
  "confidential",
  "board",
  "investor",
  "security",
  "urgent",
  "private equity",
  "hedge fund",
];

const QUICK_PROMPTS = [
  { label: "CEO calendar help", prompt: "Which phase is best for a CEO with multiple calendars and an executive assistant?" },
  { label: "EA integration", prompt: "How does the AI work with my existing Executive Assistant?" },
  { label: "White-glove scope", prompt: "What does a white-glove implementation include?" },
  { label: "Private consult", prompt: "I want a private consultation for a high-discretion executive workflow." },
];

function localAnswer(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("phase 1") || lower.includes("calendar") || lower.includes("inbox") || lower.includes("briefing")) {
    return "Phase 1 is designed for executives who need one intelligent command center across calendars, inboxes, meetings, travel, and follow-ups. It is usually the best starting point when time is being lost to fragmented tools and manual coordination. It delivers a daily executive briefing generated from approved sources.";
  }
  if (lower.includes("phase 2") || lower.includes("assistant") || lower.includes("chief of staff") || lower.includes(" ea ") || lower.includes("executive assistant")) {
    return "Phase 2 integrates the AI Concierge with your existing Executive Assistant or Chief of Staff. The AI prepares drafts, briefs, summaries, routing suggestions, and approval queues while your human team keeps judgment and final control. Your assistant stops spending hours assembling context and starts operating with a faster, more intelligent support layer.";
  }
  if (lower.includes("phase 3") || lower.includes("personalized") || lower.includes("lifestyle") || lower.includes("preferences") || lower.includes("style")) {
    return "Phase 3 personalizes the system around your communication style, lifestyle, decision patterns, travel preferences, meeting preparation style, and private workflow rules. It is ideal when the AI must adapt to the executive rather than force a generic process. Every workflow is custom — shaped around the individual.";
  }
  if (lower.includes("phase 4") || lower.includes("white-glove") || lower.includes("uhnw") || lower.includes("celebrity") || lower.includes("private office") || lower.includes("confidential")) {
    return "Phase 4 is the premium white-glove implementation for high-discretion environments. It can include private deployment architecture, encrypted intake, role-based access, staff training, approval gates, and advanced automation across executive systems. It is appropriate for UHNWIs, celebrities, public figures, major founders, private equity leaders, and family offices.";
  }
  if (lower.includes("consult") || lower.includes("price") || lower.includes("budget") || lower.includes("cost") || lower.includes("start") || lower.includes("begin")) {
    return "A private consultation usually begins with an operational assessment. We review your executive support structure, current friction points, desired automation boundaries, security expectations, and the level of human approval required. Engagements begin at $15,000 and scale to custom white-glove retainers. We recommend submitting an inquiry through our Private Inquiry form for a confidential review.";
  }
  if (lower.includes("security") || lower.includes("privacy") || lower.includes("encrypt") || lower.includes("data")) {
    return "Our recommended architecture follows SOC 2 Type II readiness principles and ISO 27001-aligned operating practices. Inquiries are encrypted before transmission. Access is restricted to authorized personnel. High-risk actions remain subject to human approval. Client data is never used to train public AI models without written permission. Clients with heightened confidentiality requirements may request a private deployment architecture.";
  }
  if (lower.includes("trust") || lower.includes("safe") || lower.includes("certification")) {
    return "Executive AI Concierge Services is designed for environments where privacy, accuracy, and judgment matter. We operate with encrypted intake, access controls, secure database design, human approval gates, audit logging, and clear data handling practices. We do not claim active SOC 2 or ISO 27001 certification — we represent our security posture accurately as readiness-aligned.";
  }

  return "The Executive AI Concierge is designed as a governed AI operating layer around your calendar, inbox, meetings, assistant workflows, and private preferences. For most clients, we begin by identifying where time is being lost and which workflows can be safely delegated to AI with human approval controls. I am happy to answer questions about any of our four service phases, or you may submit a private inquiry for a confidential consultation.";
}

function detectHighValue(message: string): boolean {
  const lower = message.toLowerCase();
  return HIGH_VALUE_SIGNALS.some((s) => lower.includes(s));
}

export default function AIConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Good day. I can help you identify which Executive AI Concierge phase best fits your needs. You may ask about the Productivity Hub, Executive Assistant integration, personalized concierge design, or white-glove implementation.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [sessionKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendChatWebhook(visitorMessage: string, assistantReply: string, highValue: boolean) {
    try {
      await fetch("/api/concierge-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionKey,
          visitorMessage,
          assistantReply,
          highValue,
          source: "ai_concierge_widget",
          page: typeof location !== "undefined" ? location.pathname : "/",
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      });
    } catch {
      // silent — don't disrupt UX on webhook failure
    }
  }

  function handleQuickPrompt(prompt: string) {
    setInputValue(prompt);
    handleSendMessage(prompt);
  }

  function handleSendMessage(messageText?: string) {
    const text = (messageText ?? inputValue).trim();
    if (!text) return;

    const userMsg: Message = { role: "visitor", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const highValue = detectHighValue(text);
    const reply = localAnswer(text);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      sendChatWebhook(text, reply, highValue);
    }, 280);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    handleSendMessage();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-display">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-3 rounded-full border border-white/10 bg-ink-900/90 px-5 py-3.5 text-ivory-50 shadow-luxury backdrop-blur-xl hover:bg-ink-800 transition-all duration-200"
        aria-label={open ? "Close AI Concierge" : "Open AI Concierge"}
        aria-expanded={open}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-gold-300 animate-pulseSoft flex-shrink-0" />
        <span className="text-sm font-medium tracking-tightLuxury">AI Concierge</span>
        <span className="text-platinum-300 text-xs ml-1 transition-transform duration-200 group-hover:scale-110">
          {open ? "✕" : "↗"}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <section
          className="absolute bottom-16 right-0 mt-4 w-[min(420px,calc(100vw-32px))] overflow-hidden rounded-executive border border-white/10 bg-ink-900/95 shadow-luxury backdrop-blur-2xl"
          role="dialog"
          aria-label="AI Concierge Chat"
        >
          {/* Header */}
          <header className="border-b border-white/10 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Private AI Concierge</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tightLuxury text-ivory-50">
                  Explore your executive operating layer.
                </h3>
                <p className="mt-2 text-sm leading-6 text-platinum-200">
                  Ask about calendar consolidation, assistant integration, private workflow
                  automation, or white-glove implementation.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-platinum-300 hover:text-ivory-50 transition-colors p-1 flex-shrink-0"
                aria-label="Close concierge"
              >
                ✕
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="max-h-[320px] space-y-4 overflow-y-auto p-5 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "visitor"
                    ? "ml-10 rounded-soft bg-ivory-50 p-4 text-sm leading-6 text-ink-950"
                    : "mr-10 rounded-soft border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-platinum-100"
                }
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 grid grid-cols-2 gap-2">
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.label}
                  onClick={() => handleQuickPrompt(qp.prompt)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-platinum-200 hover:bg-white/5 transition-colors text-left"
                >
                  {qp.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-ivory-50 outline-none placeholder:text-platinum-300 focus:border-gold-300/40 transition-colors"
                placeholder="Ask about your executive workflow..."
                aria-label="Chat input"
              />
              <button
                type="submit"
                className="rounded-full bg-ivory-50 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-colors flex-shrink-0"
              >
                Send
              </button>
            </form>

            <p className="mt-3 text-[11px] leading-5 text-platinum-300/60">
              This concierge provides general service information. Sensitive executive details
              should be submitted only through the approved secure inquiry form.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
