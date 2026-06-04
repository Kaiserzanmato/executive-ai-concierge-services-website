# Deployment Checklist

## Phase 1: Build & Infrastructure (✅ Complete)

### Xiaomi MiMo Integration (✅ Complete - Added)
- [x] Xiaomi MiMo API key added to Vercel (`XIAOMI_MIMO_API_KEY`)
- [x] `/api/concierge-mimo` endpoint created with grounded knowledge base
- [x] AI Concierge widget updated to call MiMo API
- [x] System prompt embedded with platform knowledge (4 phases, trust, security, pricing)
- [x] Loading state added during API calls
- [x] Error handling and fallback responses configured
- [x] Redeployed to Vercel production
- [x] MiMo widget now live and preventing hallucinations

## Phase 1.5: AI Enhancement (✅ Complete - New Phase)

### Local Development
- [x] Next.js 15 project initialized with TypeScript
- [x] Tailwind CSS configured with luxury design system
- [x] All 11 pages built and verified
- [x] All 3 API routes implemented
- [x] Components created (Navigation, Footer, Form, Widget, etc.)
- [x] Build runs clean: `npm run build` → 17/17 pages, 0 errors

### Git & Version Control
- [x] Project initialized with `git init`
- [x] All files committed to local repo

### Vercel Deployment
- [x] Project linked to Vercel (new project, not legacy dashboard project)
- [x] Deployment successful to `executive-ai-concierge-services.vercel.app`
- [x] Preview and production URLs generated

### Supabase Backend
- [x] Supabase project created (`Executive-AI-Concierge-Services`)
- [x] Database schema applied (`supabase/schema.sql`)
  - [x] `executive_concierge_leads` table created
  - [x] `executive_concierge_lead_events` table created
  - [x] `ai_concierge_sessions` table created
  - [x] `ai_concierge_messages` table created
  - [x] RLS enabled on all tables
  - [x] Deny-all policies in place
- [x] API keys generated
  - [x] Anon key created
  - [x] Service role key created

### Environment Variables (Vercel Production)
- [x] `SUPABASE_URL` → `https://pwqmvsuvuhwmrcgkgzin.supabase.co`
- [x] `SUPABASE_ANON_KEY` → configured as sensitive
- [x] `SUPABASE_SERVICE_ROLE_KEY` → configured as sensitive (server-only)

---

## Phase 2: Security & Encryption (⏳ Ready to Configure)

### Encryption Keys (Recommended)
- [ ] Generate RSA-2048 key pair
  ```bash
  openssl genrsa -out private.pem 2048
  openssl rsa -in private.pem -pubout -out public.pem
  ```
- [ ] Convert public key to JWK format
- [ ] Add `LEAD_ENCRYPTION_PUBLIC_KEY_JWK` to Vercel env (public)
- [ ] Add `LEAD_ENCRYPTION_PRIVATE_KEY_PEM` to Vercel env (server-only)
- [ ] Test encrypted form submission end-to-end

### Security Verification
- [ ] Verify HTTPS enforced at Vercel layer (auto-enabled)
- [ ] Check honeypot field present in form
- [ ] Confirm consent checkboxes required
- [ ] Test server-side validation blocks invalid inputs
- [ ] Verify RLS blocks anonymous/authenticated direct reads

---

## Phase 3: Webhooks & Notifications (⏳ Ready to Configure)

### CRM Integration
- [ ] Set up CRM webhook receiver endpoint
- [ ] Add `CRM_WEBHOOK_URL` to Vercel env
- [ ] Test high-value lead payload structure (see `src/app/api/leads/route.ts` line 149)
- [ ] Verify webhook fires for leads with score ≥ 65

### Email Alerts
- [ ] Set up Gmail alert webhook or Zapier integration
- [ ] Add `GMAIL_ALERT_WEBHOOK_URL` to Vercel env
- [ ] Test high-value lead email notification
- [ ] Configure recipient email address

### Google Sheets Fallback (Optional)
- [ ] Create Google Cloud service account
- [ ] Download service account JSON
- [ ] Extract `client_email`, `private_key`
- [ ] Create target Google Sheet
- [ ] Get Sheet ID from URL
- [ ] Add to Vercel:
  - [ ] `USE_GOOGLE_SHEETS_FALLBACK=true`
  - [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - [ ] `GOOGLE_PRIVATE_KEY` (with escaped `\n`)
  - [ ] `GOOGLE_SHEET_ID`
  - [ ] `GOOGLE_SHEET_RANGE` (default: `ExecutiveAILeads!A:Q`)
- [ ] Test lead appears in Google Sheet within 10 seconds

---

## Phase 4: Testing & QA (⏳ Ready to Test)

### Manual Testing — Homepage & Navigation
- [ ] Visit https://executive-ai-concierge-services.vercel.app
- [ ] Verify homepage loads with correct luxury styling (ink, ivory, platinum, gold colors)
- [ ] Test navigation links work across all pages:
  - [ ] Home
  - [ ] Services
  - [ ] Phase 1 (Productivity Hub)
  - [ ] Phase 2 (AI Executive Assistant Integration)
  - [ ] Phase 3 (Personalized AI Concierge)
  - [ ] Phase 4 (White-Glove Implementations)
  - [ ] Operating Model
  - [ ] Trust Center
  - [ ] Privacy Policy
  - [ ] Terms of Service
  - [ ] Apply (Inquiry)
- [ ] Test responsive design (mobile, tablet, desktop)

### Form Testing
- [ ] AI Concierge widget appears bottom-right
- [ ] Widget chat works with quick prompts
- [ ] Widget detects high-value keywords (UHNW, CEO, founder, confidential, urgent)
- [ ] Navigate to `/apply` page
- [ ] Form renders with all fields visible
- [ ] Honeypot field is hidden (inspect with browser DevTools)

### Lead Submission Testing
- [ ] **Test 1: Incomplete form** → Should show validation errors
  - [ ] Missing name
  - [ ] Invalid email
  - [ ] Missing consent checkboxes
  - [ ] Unchecked selections
  - [ ] Text fields < 10 chars
- [ ] **Test 2: Valid non-high-value lead**
  - [ ] Fill form with standard executive info
  - [ ] Client category: "Other"
  - [ ] Budget: "$15k-$30k"
  - [ ] Urgency: "Strategic"
  - [ ] Submit → Should receive success message
  - [ ] Check Supabase: Lead appears in `executive_concierge_leads` table with status "new"
  - [ ] Verify `lead_score` < 65, `high_value_flag` = false
  - [ ] No webhook fires
- [ ] **Test 3: High-value lead**
  - [ ] Fill form with premium signals:
  - [ ] Client category: "UHNWI" or "Celebrity"
  - [ ] Budget: "$100k+" or "Private office retainer"
  - [ ] Urgency: "Immediate"
  - [ ] Include keywords: "confidential", "family office", "white-glove"
  - [ ] Submit → Should receive success message
  - [ ] Check Supabase: Lead has `high_value_flag` = true, `lead_score` ≥ 65
  - [ ] Verify webhook was triggered (check CRM and/or email logs)
  - [ ] Verify Google Sheet received row (if enabled)
- [ ] **Test 4: Honeypot spam protection**
  - [ ] Use browser console to populate `website` field
  - [ ] Submit → Should silently accept but not create lead
  - [ ] Verify no row added to `executive_concierge_leads`

### API Testing (Advanced)
- [ ] Test `GET /api/public-encryption-key` returns valid JWK
- [ ] Test `POST /api/leads` with encrypted payload
- [ ] Test `POST /api/concierge-chat` logs session correctly
- [ ] Verify all responses have correct HTTP status codes

### Performance & UX
- [ ] Page load time < 3 seconds (check Vercel Analytics)
- [ ] No console errors
- [ ] No layout shifts (CLS = 0)
- [ ] Animations smooth (no jank)
- [ ] Form submission feedback clear and timely

---

## Phase 5: Analytics & Monitoring (⏳ Optional)

### Google Analytics (Optional)
- [ ] Create Google Analytics property
- [ ] Get tracking ID (`G-XXXXXXXXXX`)
- [ ] Add `NEXT_PUBLIC_GA_ID` to Vercel env
- [ ] Redeploy
- [ ] Verify page views tracked in Analytics dashboard

### Vercel Analytics
- [ ] Enable Web Vitals in Vercel dashboard (auto-enabled)
- [ ] Monitor Core Web Vitals:
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1

### Error Tracking
- [ ] Monitor Vercel Logs for errors
- [ ] Set up error alerting (optional: Sentry, Rollbar)

---

## Phase 6: Domain & Branding (⏳ Optional)

### Custom Domain
- [ ] Purchase domain (e.g., `executiveaiconcierge.com`)
- [ ] Add domain to Vercel project (Settings → Domains)
- [ ] Update DNS records (CNAME/A records)
- [ ] Verify SSL certificate issued (Vercel auto-handles)
- [ ] Redirect `www` variant if desired
- [ ] Update footer links to use custom domain

### Email Configuration
- [ ] Configure transactional email sender (SendGrid, Mailgun)
- [ ] Set up DKIM/SPF records for email domain
- [ ] Test lead notification emails reach inbox (not spam)

---

## Phase 7: Launch & Monitoring (🚀 Ready)

### Pre-Launch Checklist
- [ ] All environment variables configured in Vercel
- [ ] Encryption keys generated and set (if using)
- [ ] Webhooks tested and working
- [ ] Form tested end-to-end with real lead submission
- [ ] All pages tested on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] SSL certificate valid and HTTPS enforced
- [ ] Performance metrics acceptable

### Launch
- [ ] Announce domain to stakeholders
- [ ] Share `/apply` link with prospective clients
- [ ] Monitor Vercel logs for first 24 hours

### Post-Launch Monitoring
- [ ] Daily check-in on lead submissions
- [ ] Weekly review of high-value leads
- [ ] Monitor Vercel Analytics for performance degradation
- [ ] Keep Supabase database clean (archive old leads if volume grows)
- [ ] Review user feedback and form usability

---

## Current Status: ✅ Phase 1 & 1.5 Complete → Ready for Phase 2

**Site is live with MiMo AI Concierge:** https://executive-ai-concierge-services.vercel.app

**What's complete:**
- ✅ Full site build and deployment
- ✅ Supabase backend with lead capture
- ✅ Xiaomi MiMo AI Concierge widget (grounded, no hallucinations)

**Next immediate action:** Configure encryption keys and webhooks (Phase 2), then test lead form end-to-end (Phase 4).
