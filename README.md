# Executive AI Concierge Services

A premium B2B SaaS platform providing AI-powered executive support for high-net-worth individuals and C-suite executives.

**Live:** https://executive-ai-concierge-services.vercel.app

## 🚀 Features

### Marketing Website
- Service tier descriptions (Phase 1–4 implementation roadmap)
- Trust center & compliance documentation
- Privacy policy & terms of service
- Lead inquiry form with client-side RSA-AES hybrid encryption

### Executive Operations Assessment
- **11-step multi-step wizard** with resume capability (localStorage-based)
- **Real-time scoring** (Operations Score, AI Readiness Score)
- **Personalized recommendations** with phase recommendations
- **Report generation** (PDF, Markdown, Text, CSV)
- **Email delivery** via Resend transactional email
- **Consultation request capture** with CRM webhook integration

### AI Integrations (Planned)
- DeepSeek R1 research agent for risk explanations
- Dynamic hazard mapping with MapGL
- Multi-modal AI analysis (GPT-4V, Claude Vision)

## 🏗️ Tech Stack

### Frontend
- **Next.js 15.3** (App Router, TypeScript, React 18)
- **Tailwind CSS 3.4** (luxury dark-mode design)
- **@react-pdf/renderer** (serverless PDF generation)

### Backend
- **Node.js 18+** (Vercel serverless)
- **TypeScript 5** (strict mode)
- **Resend** (transactional email)
- **Google APIs** (Sheets fallback, Gmail alerts)

### Database
- **Supabase PostgreSQL** (managed, RLS-protected)
- **Row-Level Security** (deny-all anon/authenticated, service-role bypass)

### Deployment & Infrastructure
- **Vercel** (compute, CDN, automatic HTTPS)
- **Supabase Cloud** (database, backups, monitoring)
- **GitHub Actions** (CI/CD pipeline)

### AI-Assisted Development
- **Planning:** Google Gemini
- **Implementation:** Claude Sonnet 5, Claude Haiku 4.5 (Claude Code CLI)
- **Code Review:** Claude Opus 4.8

## 📋 Quick Start

### Prerequisites
- Node.js 18+ & npm 9+
- Git
- Supabase project (free tier available)
- Resend API key (optional, for email)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Kaiserzanmato/Executive-AI-Concierge-Services.git
cd Executive-AI-Concierge-Services

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Fill in environment variables (see DEPLOYMENT.md for details)
# Required: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
# Required: LEAD_ENCRYPTION_PUBLIC_KEY_JWK, LEAD_ENCRYPTION_PRIVATE_KEY_PEM

# Start development server
npm run dev
# Open http://localhost:3000
```

### Build & Deploy

```bash
# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Complete system architecture, tech stack, deployment |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Vercel & Supabase setup, environment variables, CI/CD |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Development workflow, commit conventions, code style |
| [SECURITY.md](./SECURITY.md) | Security practices, encryption, API protection |
| [API.md](./docs/API.md) | All API endpoints, request/response examples |
| [DATABASE.md](./docs/DATABASE.md) | Schema, migrations, RLS policies |

## 🔐 Security

- **HTTPS/TLS 1.3** (Vercel-managed, auto-renew)
- **Client-side encryption:** RSA-OAEP-256 + AES-GCM-256 (hybrid)
- **Database encryption:** PostgreSQL native + Supabase key management
- **Input sanitization:** `cleanText()`, length limits, email validation
- **Rate limiting:** 5 assessments per IP per hour (SHA-256 hashed IPs)
- **Security headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Row-Level Security:** Deny-all anon/authenticated; service-role only API access

See [SECURITY.md](./SECURITY.md) for detailed security architecture.

## 📊 Database

**Supabase PostgreSQL** with 7 tables:
- `executive_concierge_assessment_respondents` (sessions & metadata)
- `executive_concierge_assessment_responses` (flexible JSONB answers per step)
- `executive_concierge_assessment_scores` (computed scores & recommendations)
- `executive_concierge_consultation_requests` (post-assessment requests)
- `executive_concierge_assessment_rate_limits` (IP-based throttling)
- `executive_concierge_leads` (inquiry form submissions)
- `executive_concierge_lead_events` (event log for scoring & CRM)

### Running Migrations

```bash
# 1. Log in to Supabase dashboard → SQL Editor
# 2. Copy & paste migration SQL
# 3. Execute in SQL editor

# Initial schema:
cat supabase/assessment-schema.sql

# V2 migration (adds recommended_services, suggested_next_step):
cat supabase/assessment-schema-v2.sql
```

## 🌐 Deployment

### Production (Vercel)
```bash
# All commits to main → auto-build & deploy to production
git push origin main

# Preview deploy on every branch:
git push origin feature/your-feature
```

**Production URL:** https://executive-ai-concierge-services.vercel.app

### Environment Variables
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

**Required:**
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `LEAD_ENCRYPTION_PUBLIC_KEY_JWK`, `LEAD_ENCRYPTION_PRIVATE_KEY_PEM`

**Optional:**
- `RESEND_API_KEY` (email reports)
- `CRM_WEBHOOK_URL`, `ASSESSMENT_CONSULTATION_WEBHOOK_URL` (CRM handoff)
- `GOOGLE_*` (Sheets fallback)

## 🔧 Development

### Project Structure
```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (12 endpoints)
│   ├── assessment/           # /assessment (wizard) & /results
│   ├── apply/                # /apply (inquiry form)
│   ├── services/             # Service phase pages
│   └── ...                   # Other pages (privacy, terms, trust, etc.)
├── components/               # React components
│   ├── assessment/           # Wizard components (11 steps)
│   ├── InquiryForm.tsx      # Lead capture form
│   └── ...
├── lib/                      # Business logic & utilities
│   ├── assessmentScoring.ts # Scoring engine
│   ├── rateLimiter.ts       # Rate limiting
│   └── ...
└── styles/                   # Global CSS & design tokens
```

### Scripts
```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style
- **TypeScript** strict mode (no `any`)
- **ESLint** (Next.js config)
- **Tailwind CSS** for styling
- **Conventional Commits** (feat:, fix:, refactor:, docs:, test:)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 🚦 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/assessment/start` | POST | Initialize wizard session |
| `/api/assessment/resume` | GET | Restore session state |
| `/api/assessment/save-step` | POST | Auto-save section answers |
| `/api/assessment/preview` | POST | Compute scores (no DB write) |
| `/api/assessment/complete` | POST | Finalize & store scores |
| `/api/assessment/report` | POST | Generate PDF/MD/TXT/CSV report |
| `/api/assessment/email-report` | POST | Email report to respondent |
| `/api/assessment/consultation-request` | POST | Capture consultation request |
| `/api/leads` | POST | Inquiry form submission (main CRM feed) |
| `/api/concierge-chat` | POST | AI research agent (placeholder) |
| `/api/public-encryption-key` | GET | RSA public key for client-side encryption |

Full details in [docs/API.md](./docs/API.md).

## 🧪 Testing

### Current
- **TypeScript strict mode** (compile-time type checking)
- **ESLint** (static code analysis)
- **Manual testing** via `npm run dev`
- **Vercel preview deploys** (test before production)

### Planned
- **Jest** (unit tests)
- **Playwright** (E2E tests)
- **GitHub Actions** (automated test runs on PR)

## 📈 Monitoring & Logging

- **Vercel Dashboard:** Build logs, function metrics, edge cache status
- **Supabase Dashboard:** Database performance, query insights, connection pool
- **Browser DevTools:** Client-side debugging (dev only)

**Planned:**
- **Sentry** (production error tracking)
- **DataDog** (comprehensive observability & APM)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development workflow
- Commit conventions
- Code review process
- How to add features & fix bugs

**Quick PR checklist:**
- [ ] Branch from `main`
- [ ] Make changes (follow code style)
- [ ] Test locally: `npm run build && npm run lint`
- [ ] Commit with conventional message
- [ ] Push & create GitHub PR
- [ ] Vercel preview deploys automatically
- [ ] Merge after review & approval

## 📄 License

MIT License — see [LICENSE](./LICENSE) file

## 📧 Contact

**Built with:** Anthropic Claude (Sonnet 5, Haiku 4.5)  
**Deployed with:** Vercel + Supabase  
**Repository:** https://github.com/Kaiserzanmato/Executive-AI-Concierge-Services

---

**Questions?** Open an issue on GitHub or review [CONTRIBUTING.md](./CONTRIBUTING.md).

**Want to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

**Security issues?** Email: [your-email@example.com] (do not open public issues for security vulnerabilities)
