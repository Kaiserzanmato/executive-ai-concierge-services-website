"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ASSESSMENT_SECTIONS } from "@/lib/assessmentSections";
import type { AssessmentScoreResult } from "@/lib/assessmentScoring";
import { ExecutiveProfileSection } from "./sections/ExecutiveProfileSection";
import { MotivationsSection } from "./sections/MotivationsSection";
import { TimeDrainAreasSection } from "./sections/TimeDrainAreasSection";
import { DesiredOutcomesSection } from "./sections/DesiredOutcomesSection";
import { AIDelegationLevelSection } from "./sections/AIDelegationLevelSection";
import { AIServicesInterestSection } from "./sections/AIServicesInterestSection";
import { CurrentAIToolsSection } from "./sections/CurrentAIToolsSection";
import { ImplementationTimelineSection } from "./sections/ImplementationTimelineSection";
import { InvestmentReadinessSection } from "./sections/InvestmentReadinessSection";
import { RecommendationSection } from "./sections/RecommendationSection";
import { ConsultationPreferencesSection } from "./sections/ConsultationPreferencesSection";

const RESUME_TOKEN_KEY = "assessment_resume_token";
const ESTIMATED_MINUTES = "5-8 minutes";

type WizardStatus = "loading" | "active" | "submitting" | "error";

export function AssessmentWizard() {
  const router = useRouter();
  const [status, setStatus] = useState<WizardStatus>("loading");
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, Record<string, unknown>>>({});
  const [savingStep, setSavingStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewScores, setPreviewScores] = useState<AssessmentScoreResult | null>(null);

  useEffect(() => {
    async function init() {
      const stored = typeof window !== "undefined" ? localStorage.getItem(RESUME_TOKEN_KEY) : null;

      if (stored) {
        try {
          const res = await fetch(`/api/assessment/resume?token=${encodeURIComponent(stored)}`);
          const result = await res.json();
          if (res.ok && result.ok) {
            setResumeToken(stored);
            setAnswers(result.answers || {});
            setCurrentStep(result.currentStep || 1);
            setStatus("active");
            return;
          }
        } catch {
          // fall through to starting fresh
        }
      }

      try {
        const res = await fetch("/api/assessment/start", { method: "POST" });
        const result = await res.json();
        if (!res.ok || !result.ok) throw new Error(result.error || "Unable to start assessment.");
        localStorage.setItem(RESUME_TOKEN_KEY, result.resumeToken);
        setResumeToken(result.resumeToken);
        setStatus("active");
      } catch (err) {
        setErrorMessage((err as Error).message || "Unable to start the assessment.");
        setStatus("error");
      }
    }

    init();
  }, []);

  useEffect(() => {
    const section = ASSESSMENT_SECTIONS[currentStep - 1];
    if (!resumeToken || !section || section.key !== "recommendation" || previewScores) return;

    async function fetchPreview() {
      try {
        const res = await fetch("/api/assessment/preview", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ resumeToken }),
        });
        const result = await res.json();
        if (res.ok && result.ok) {
          setPreviewScores(result.scores);
        }
      } catch {
        // silent — RecommendationSection shows a loading state until this resolves
      }
    }

    fetchPreview();
  }, [currentStep, resumeToken, previewScores]);

  async function handleSectionNext(sectionKey: string, sectionAnswers: Record<string, unknown>) {
    if (!resumeToken) return;

    setSavingStep(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/assessment/save-step", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resumeToken, sectionKey, answers: sectionAnswers }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Unable to save your progress.");

      setAnswers((prev) => ({ ...prev, [sectionKey]: sectionAnswers }));

      const isLastSection = currentStep === ASSESSMENT_SECTIONS.length;

      if (isLastSection) {
        setStatus("submitting");
        const completeRes = await fetch("/api/assessment/complete", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ resumeToken }),
        });
        const completeResult = await completeRes.json();
        if (!completeRes.ok || !completeResult.ok) {
          throw new Error(completeResult.error || "Unable to compute your results.");
        }
        localStorage.removeItem(RESUME_TOKEN_KEY);
        router.push(`/assessment/results?token=${encodeURIComponent(resumeToken)}`);
        return;
      }

      setCurrentStep((s) => s + 1);
      setStatus("active");
    } catch (err) {
      setErrorMessage((err as Error).message || "Something went wrong. Please try again.");
      setStatus("active");
    } finally {
      setSavingStep(false);
    }
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(1, s - 1));
  }

  if (status === "loading") {
    return (
      <div className="rounded-executive border border-white/10 bg-white/[0.03] p-10 text-center text-platinum-200">
        Preparing your private assessment...
      </div>
    );
  }

  if (status === "error" && !resumeToken) {
    return (
      <div
        role="alert"
        className="rounded-soft border border-signal-red/30 bg-signal-red/10 p-6 text-sm text-signal-red"
      >
        {errorMessage || "Unable to load the assessment. Please refresh and try again."}
      </div>
    );
  }

  const section = ASSESSMENT_SECTIONS[currentStep - 1];
  const totalSteps = ASSESSMENT_SECTIONS.length;

  return (
    <div className="space-y-6">
      <div aria-live="polite" className="space-y-2">
        <div className="flex items-center justify-between text-xs text-platinum-300">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>Estimated time remaining: {ESTIMATED_MINUTES}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gold-300 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="rounded-soft border border-signal-red/30 bg-signal-red/10 p-4">
          <p className="text-sm text-signal-red leading-6">{errorMessage}</p>
        </div>
      )}

      {section.key === "executive_profile" && (
        <ExecutiveProfileSection
          defaultValues={answers.executive_profile}
          onNext={(a) => handleSectionNext("executive_profile", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "motivations" && (
        <MotivationsSection
          defaultValues={answers.motivations}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("motivations", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "time_drain_areas" && (
        <TimeDrainAreasSection
          defaultValues={answers.time_drain_areas}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("time_drain_areas", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "desired_outcomes" && (
        <DesiredOutcomesSection
          defaultValues={answers.desired_outcomes}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("desired_outcomes", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "ai_delegation_level" && (
        <AIDelegationLevelSection
          defaultValues={answers.ai_delegation_level}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("ai_delegation_level", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "ai_services_interest" && (
        <AIServicesInterestSection
          defaultValues={answers.ai_services_interest}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("ai_services_interest", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "current_ai_tools" && (
        <CurrentAIToolsSection
          defaultValues={answers.current_ai_tools}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("current_ai_tools", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "implementation_timeline" && (
        <ImplementationTimelineSection
          defaultValues={answers.implementation_timeline}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("implementation_timeline", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "investment_readiness" && (
        <InvestmentReadinessSection
          defaultValues={answers.investment_readiness}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("investment_readiness", a as unknown as Record<string, unknown>)}
          submitting={savingStep}
        />
      )}
      {section.key === "recommendation" && (
        <RecommendationSection
          scores={previewScores}
          onBack={handleBack}
          onNext={() => handleSectionNext("recommendation", {})}
          submitting={savingStep}
        />
      )}
      {section.key === "consultation_preferences" && (
        <ConsultationPreferencesSection
          defaultValues={answers.consultation_preferences}
          onBack={handleBack}
          onNext={(a) => handleSectionNext("consultation_preferences", a as unknown as Record<string, unknown>)}
          submitting={status === "submitting" || savingStep}
        />
      )}
    </div>
  );
}
