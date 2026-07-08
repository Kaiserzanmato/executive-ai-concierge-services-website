"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

const EXECUTIVE_TYPES = [
  "Founder",
  "CEO",
  "C-Suite Executive",
  "Board Advisor",
  "Family Office",
  "Investor",
  "Venture Capital / Private Equity Professional",
  "Investment Banker",
  "Private Banker",
  "Wealth Manager",
  "Asset Manager",
  "Hedge Fund Professional",
  "UHNWI",
  "Celebrity",
  "Professional Athlete",
  "Artist",
  "Influencer / Content Creator",
  "Real Estate Investor",
  "Trader (Forex / Stocks / Crypto)",
  "Other Executive Decision Maker",
];

const INDUSTRIES = [
  "Technology / Software / SaaS",
  "Artificial Intelligence / Automation",
  "Financial Services / Banking",
  "Investment Banking",
  "Private Banking / Wealth Management",
  "Venture Capital / Private Equity",
  "Family Office",
  "Insurance / InsurTech",
  "Healthcare / Life Sciences",
  "Professional Services / Consulting",
  "Legal Services",
  "Real Estate / Property Development",
  "Luxury / Concierge / Private Client Services",
  "Media / Entertainment / Creator Economy",
  "Sports / Athlete Management",
  "Retail / E-commerce / Consumer Goods",
  "Hospitality / Travel / Tourism",
  "Manufacturing / Industrial",
  "Logistics / Supply Chain",
  "Energy / Utilities / CleanTech",
  "Education / Training / EdTech",
  "Government / Public Sector",
  "Nonprofit / Foundation / Social Impact",
  "Telecommunications",
  "Cybersecurity / Risk / Compliance",
  "Crypto / Web3 / Digital Assets",
  "Trading: Forex / Stocks / Crypto",
  "Agriculture / Food / Natural Resources",
  "Construction / Infrastructure",
  "Other",
];

const COMPANY_SIZES = ["Solo / Independent", "2-10", "11-50", "51-200", "201-1,000", "1,000+"];
const INCOME_RANGES = ["Under $500K", "$500K - $1M", "$1M - $5M", "$5M - $25M", "$25M+", "Prefer not to say"];

export interface ExecutiveProfileAnswers {
  fullName: string;
  email: string;
  executiveType: string;
  industry: string;
  companySize: string;
  incomeRange: string;
}

export function ExecutiveProfileSection({
  defaultValues,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<ExecutiveProfileAnswers>;
  onNext: (answers: ExecutiveProfileAnswers) => void;
  submitting?: boolean;
}) {
  const [values, setValues] = useState<ExecutiveProfileAnswers>({
    fullName: defaultValues?.fullName ?? "",
    email: defaultValues?.email ?? "",
    executiveType: defaultValues?.executiveType ?? "",
    industry: defaultValues?.industry ?? "",
    companySize: defaultValues?.companySize ?? "",
    incomeRange: defaultValues?.incomeRange ?? "",
  });

  return (
    <SectionShell
      title="Executive Profile"
      description="Tell us who you are so we can tailor the assessment to your operating context."
      onNext={() => onNext(values)}
      isFirst
      submitting={submitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full name</label>
          <input
            type="text"
            className="form-field"
            value={values.fullName}
            onChange={(e) => setValues({ ...values, fullName: e.target.value })}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-field"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="you@yourorganization.com"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Executive type</label>
        <select
          className="form-field"
          value={values.executiveType}
          onChange={(e) => setValues({ ...values, executiveType: e.target.value })}
        >
          <option value="">Select your profile</option>
          {EXECUTIVE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Industry</label>
          <select
            className="form-field"
            value={values.industry}
            onChange={(e) => setValues({ ...values, industry: e.target.value })}
          >
            <option value="">Select your industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Organization size</label>
          <select
            className="form-field"
            value={values.companySize}
            onChange={(e) => setValues({ ...values, companySize: e.target.value })}
          >
            <option value="">Select a range</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Income range (optional, kept confidential)</label>
        <select
          className="form-field"
          value={values.incomeRange}
          onChange={(e) => setValues({ ...values, incomeRange: e.target.value })}
        >
          <option value="">Select a range</option>
          {INCOME_RANGES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </SectionShell>
  );
}
