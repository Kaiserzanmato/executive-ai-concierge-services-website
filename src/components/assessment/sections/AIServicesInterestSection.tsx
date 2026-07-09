"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { DescriptiveCheckboxGroup, type DescriptiveOption } from "../fields";

const SERVICE_OPTIONS: DescriptiveOption[] = [
  {
    value: "Executive AI Concierge",
    label: "Executive AI Concierge",
    description:
      "Personalized executive support for managing business priorities, personal time, daily coordination, and high-value workflows.",
  },
  {
    value: "Executive AI Assistant",
    label: "Executive AI Assistant",
    description: "Helps with emails, calendar management, meeting summaries, scheduling, reminders, and follow-ups.",
  },
  {
    value: "Workflow Automation",
    label: "Workflow Automation",
    description: "Connects your apps and tools to automate repetitive tasks and reduce manual work.",
  },
  {
    value: "Autonomous AI Agents",
    label: "Autonomous AI Agents",
    description: "AI agents that can complete approved tasks with clear rules, permissions, and human oversight.",
  },
  {
    value: "AI Research & Intelligence",
    label: "AI Research & Intelligence",
    description: "Helps with market research, competitor tracking, executive briefings, and decision support.",
  },
  {
    value: "Executive Dashboard",
    label: "Executive Dashboard",
    description: "A central view of key updates, tasks, reports, priorities, and business performance.",
  },
  {
    value: "AI Knowledge Base",
    label: "AI Knowledge Base",
    description: "An AI assistant trained on your documents, SOPs, FAQs, and internal information.",
  },
  {
    value: "AI Strategy & Consulting",
    label: "AI Strategy & Consulting",
    description: "Guidance on where AI can create value, reduce workload, improve security, and support business growth.",
  },
  {
    value: "AI Training",
    label: "AI Training",
    description: "Hands-on training for executives, teams, or assistants on how to use AI safely and effectively.",
  },
  {
    value: "Custom AI Software",
    label: "Custom AI Software",
    description: "Custom-built tools, dashboards, agents, or secure AI systems based on your specific needs.",
  },
  {
    value: "Not sure yet",
    label: "Not sure yet",
    description: "We will recommend the best fit based on your answers.",
  },
  {
    value: "Other / Custom Request",
    label: "Other / Custom Request",
  },
];

const OTHER_VALUE = "Other / Custom Request";

export interface AIServicesInterestAnswers {
  services: string[];
  customRequest?: string;
}

export function AIServicesInterestSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<AIServicesInterestAnswers>;
  onBack: () => void;
  onNext: (answers: AIServicesInterestAnswers) => void;
  submitting?: boolean;
}) {
  const [services, setServices] = useState<string[]>(defaultValues?.services ?? []);
  const [customRequest, setCustomRequest] = useState<string>(defaultValues?.customRequest ?? "");

  return (
    <SectionShell
      title="Which AI services interest you?"
      description="Select all that apply."
      onBack={onBack}
      onNext={() => onNext({ services, customRequest })}
      submitting={submitting}
    >
      <DescriptiveCheckboxGroup options={SERVICE_OPTIONS} selected={services} onChange={setServices} />

      {services.includes(OTHER_VALUE) && (
        <div>
          <label className="form-label">Tell us what you need help with.</label>
          <textarea
            className="form-field resize-none"
            rows={3}
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            placeholder="Describe your custom request..."
          />
        </div>
      )}
    </SectionShell>
  );
}
