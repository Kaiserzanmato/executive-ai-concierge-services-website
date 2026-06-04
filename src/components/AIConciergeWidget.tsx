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

  async function handleSendMessage(messageText?: string) {
    const text = (messageText ?? inputValue).trim();
    if (!text) return;

    const userMsg: Message = { role: "visitor", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const highValue = detectHighValue(text);

    // Add loading indicator
    setMessages((prev) => [...prev, { role: "assistant", text: "Processing your inquiry..." }]);

    try {
      // Call MiMo API for grounded response
      const response = await fetch("/api/concierge-mimo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      const reply = data.ok ? data.reply : "I encountered an issue processing your request. Please try again or submit a private inquiry.";

      // Replace loading indicator with actual reply
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1].text === "Processing your inquiry...") {
          updated[updated.length - 1].text = reply;
        } else {
          updated.push({ role: "assistant", text: reply });
        }
        return updated;
      });

      // Log to chat webhook
      sendChatWebhook(text, reply, highValue);
    } catch (err) {
      console.error("MiMo fetch error:", err);
      const fallbackReply = "I'm experiencing technical difficulties. Please try again or submit a private inquiry.";

      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1].text === "Processing your inquiry...") {
          updated[updated.length - 1].text = fallbackReply;
        } else {
          updated.push({ role: "assistant", text: fallbackReply });
        }
        return updated;
      });

      sendChatWebhook(text, fallbackReply, highValue);
    }
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
