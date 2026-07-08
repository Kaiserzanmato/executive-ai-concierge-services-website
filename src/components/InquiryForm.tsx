"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";

type FormStatus = "idle" | "encrypting" | "submitting" | "success" | "error";

async function importPublicKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["encrypt"]
  );
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function encryptPayload(payload: unknown): Promise<unknown> {
  try {
    const keyRes = await fetch("/api/public-encryption-key");
    if (!keyRes.ok) throw new Error("Key unavailable");
    const jwk: JsonWebKey = await keyRes.json();
    const publicKey = await importPublicKey(jwk);

    const aesKey = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(payload));
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoded);
    const rawAes = await crypto.subtle.exportKey("raw", aesKey);
    const wrappedKey = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, rawAes);

    return {
      mode: "client_hybrid_rsa_oaep_aes_gcm",
      alg: "RSA-OAEP-256 + AES-GCM-256",
      iv: arrayBufferToBase64(iv.buffer as ArrayBuffer),
      wrappedKey: arrayBufferToBase64(wrappedKey),
      ciphertext: arrayBufferToBase64(ciphertext),
    };
  } catch {
    return null;
  }
}

const categoryOptions = [
  "C-Suite Executive",
  "Founder or CEO",
  "Family Office",
  "Ultra-High-Net-Worth Individual",
  "Celebrity or Public Figure",
  "Private Equity or Investment Leader",
  "Executive Assistant or Chief of Staff",
  "Other Executive Profile",
];

const budgetOptions = [
  "$15,000 to $30,000",
  "$30,000 to $50,000",
  "$50,000 to $100,000",
  "$100,000 and above",
  "Private office retainer discussion",
];

const phaseOptions = [
  "Phase 1: Unified Executive Productivity Hub",
  "Phase 2: AI Executive Assistant Integration",
  "Phase 3: Personalized AI Concierge Experience",
  "Phase 4: Premium White-Glove C-Suite Implementation",
  "Full assessment — recommend what fits",
];

const urgencyOptions = [
  "Immediate private consultation",
  "Within 30 days",
  "This quarter",
  "Strategic planning stage",
];

export default function InquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): string[] {
    const errs: string[] = [];
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const category = String(data.get("clientCategory") || "").trim();
    const budget = String(data.get("estimatedBudgetRange") || "").trim();
    const phase = String(data.get("desiredPhase") || "").trim();
    const urgency = String(data.get("urgency") || "").trim();
    const context = String(data.get("executiveContextSummary") || "").trim();
    const pain = String(data.get("operationalPainPoints") || "").trim();
    const outcome = String(data.get("requestedOutcome") || "").trim();
    const privacyConsent = data.get("consentPrivacy") === "on";
    const contactConsent = data.get("consentContact") === "on";

    if (!fullName || fullName.length < 2) errs.push("Full name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push("A valid email address is required.");
    if (!category) errs.push("Please select a client category.");
    if (!budget) errs.push("Please select an estimated budget range.");
    if (!phase) errs.push("Please select a primary service interest.");
    if (!urgency) errs.push("Please select an implementation timeline.");
    if (!context || context.length < 20) errs.push("Please provide at least 20 characters of executive context.");
    if (!pain || pain.length < 20) errs.push("Please describe your operational pain points (20+ characters).");
    if (!outcome || outcome.length < 20) errs.push("Please describe your desired outcome (20+ characters).");
    if (!privacyConsent) errs.push("Privacy policy consent is required.");
    if (!contactConsent) errs.push("Contact consent is required.");
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current!;
    const data = new FormData(form);

    // Honeypot check (client-side)
    if (data.get("website")) return;

    setErrors([]);
    const validationErrors = validate(data);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("encrypting");

    const payload = {
      fullName: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      roleTitle: String(data.get("roleTitle") || "").trim(),
      country: String(data.get("country") || "").trim(),
      clientCategory: String(data.get("clientCategory") || "").trim(),
      estimatedBudgetRange: String(data.get("estimatedBudgetRange") || "").trim(),
      desiredPhase: String(data.get("desiredPhase") || "").trim(),
      urgency: String(data.get("urgency") || "").trim(),
      executiveContextSummary: String(data.get("executiveContextSummary") || "").trim(),
      operationalPainPoints: String(data.get("operationalPainPoints") || "").trim(),
      requestedOutcome: String(data.get("requestedOutcome") || "").trim(),
      consentPrivacy: data.get("consentPrivacy") === "on",
      consentContact: data.get("consentContact") === "on",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      utmSource: new URLSearchParams(typeof location !== "undefined" ? location.search : "").get("utm_source") || "",
      utmMedium: new URLSearchParams(typeof location !== "undefined" ? location.search : "").get("utm_medium") || "",
      utmCampaign: new URLSearchParams(typeof location !== "undefined" ? location.search : "").get("utm_campaign") || "",
    };

    const encryptedPayload = await encryptPayload(payload);

    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, encryptedPayload }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Submission failed.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrors([(err as Error).message || "We could not complete the secure submission. Please try again or contact us directly."]);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
      aria-label="Private Executive Inquiry Form"
    >
      {/* Honeypot — hidden from real users, visible to bots */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Two-column grid on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="form-label">
            Full name <span className="text-signal-red">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Executive email <span className="text-signal-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourorganization.com"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone or secure line
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (000) 000-0000"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="company" className="form-label">
            Company or private office
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Organization or private office name"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="roleTitle" className="form-label">
            Role or title
          </label>
          <input
            id="roleTitle"
            name="roleTitle"
            type="text"
            placeholder="e.g., CEO, Founder, Chief of Staff"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="United States"
            className="form-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="clientCategory" className="form-label">
          Client category <span className="text-signal-red">*</span>
        </label>
        <select id="clientCategory" name="clientCategory" required className="form-field">
          <option value="">Select your profile</option>
          {categoryOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="estimatedBudgetRange" className="form-label">
          Estimated implementation budget <span className="text-signal-red">*</span>
        </label>
        <select id="estimatedBudgetRange" name="estimatedBudgetRange" required className="form-field">
          <option value="">Select a range</option>
          {budgetOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="desiredPhase" className="form-label">
          Primary service interest <span className="text-signal-red">*</span>
        </label>
        <select id="desiredPhase" name="desiredPhase" required className="form-field">
          <option value="">Select a phase</option>
          {phaseOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="urgency" className="form-label">
          Implementation timeline <span className="text-signal-red">*</span>
        </label>
        <select id="urgency" name="urgency" required className="form-field">
          <option value="">Select a timeline</option>
          {urgencyOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="executiveContextSummary" className="form-label">
          Executive context <span className="text-signal-red">*</span>
        </label>
        <p className="text-xs text-platinum-300 mt-1 mb-2">
          Briefly describe your current executive support environment — staff, tools, and how your day is structured.
        </p>
        <textarea
          id="executiveContextSummary"
          name="executiveContextSummary"
          required
          rows={4}
          placeholder="Describe your current executive operating environment..."
          className="form-field resize-none"
        />
      </div>

      <div>
        <label htmlFor="operationalPainPoints" className="form-label">
          Current operational pain points <span className="text-signal-red">*</span>
        </label>
        <p className="text-xs text-platinum-300 mt-1 mb-2">
          Where is time being lost? What is fragmented, manual, or consuming disproportionate attention?
        </p>
        <textarea
          id="operationalPainPoints"
          name="operationalPainPoints"
          required
          rows={4}
          placeholder="Describe the friction points in your current workflow..."
          className="form-field resize-none"
        />
      </div>

      <div>
        <label htmlFor="requestedOutcome" className="form-label">
          Desired outcome <span className="text-signal-red">*</span>
        </label>
        <p className="text-xs text-platinum-300 mt-1 mb-2">
          What does success look like in 90 days? What would change if your AI operating layer were in place?
        </p>
        <textarea
          id="requestedOutcome"
          name="requestedOutcome"
          required
          rows={4}
          placeholder="Describe your ideal outcome..."
          className="form-field resize-none"
        />
      </div>

      {/* Consent */}
      <div className="space-y-4 pt-2">
        <label className="flex gap-3 items-start cursor-pointer group">
          <input
            name="consentPrivacy"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-platinum-200 leading-6">
            I agree to the{" "}
            <Link href="/privacy" className="text-gold-300 hover:text-gold-100 underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and understand that my inquiry may be reviewed for private consultation fit.{" "}
            <span className="text-signal-red">*</span>
          </span>
        </label>

        <label className="flex gap-3 items-start cursor-pointer group">
          <input
            name="consentContact"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-platinum-200 leading-6">
            I consent to being contacted regarding Executive AI Concierge Services.{" "}
            <span className="text-signal-red">*</span>
          </span>
        </label>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div
          role="alert"
          className="rounded-soft border border-signal-red/30 bg-signal-red/10 p-4"
        >
          <ul className="space-y-1">
            {errors.map((err, i) => (
              <li key={i} className="text-sm text-signal-red leading-6">
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success */}
      {status === "success" && (
        <div
          role="status"
          className="rounded-soft border border-signal-green/30 bg-signal-green/10 p-5 text-sm text-signal-green leading-7"
        >
          Your private inquiry has been received securely. A qualified advisor will review your
          request and reach out through your preferred channel within one business day.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "encrypting" || status === "submitting" || status === "success"}
        className="w-full rounded-full bg-ivory-50 px-6 py-4 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "encrypting"
          ? "Securing your inquiry..."
          : status === "submitting"
          ? "Submitting..."
          : status === "success"
          ? "Inquiry received"
          : "Submit Private Inquiry"}
      </button>

      <p className="text-xs text-platinum-300/60 text-center leading-5">
        Your inquiry is encrypted before transmission. No client relationship is created until a
        written agreement is executed. All information is handled according to our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-platinum-200">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
