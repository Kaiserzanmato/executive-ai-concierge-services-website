# Executive AI Concierge Services — Setup Guide

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in .env.local with your values (see below)
npm run dev
```

Open http://localhost:3000

## Environment Variables

Copy `.env.local.example` to `.env.local` and populate:

### Required

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key (used for client-safe ops) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **server-side only, never expose to browser** |

### Encryption (recommended for production)

| Variable | Description |
|---|---|
| `LEAD_ENCRYPTION_PUBLIC_KEY_JWK` | RSA public key in JWK format (JSON string) for client-side hybrid encryption |
| `LEAD_ENCRYPTION_PRIVATE_KEY_PEM` | RSA private key PEM for server-side decryption |

Generate keys:
```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
# Then convert to JWK using node-jose or similar
```

If `LEAD_ENCRYPTION_PUBLIC_KEY_JWK` is not set, the `/api/public-encryption-key` endpoint returns 500 and the form falls back to submitting without client-side encryption (still HTTPS-protected).

### Webhooks (optional)

| Variable | Description |
|---|---|
| `CRM_WEBHOOK_URL` | POST endpoint to notify CRM on high-value leads |
| `GMAIL_ALERT_WEBHOOK_URL` | POST endpoint to alert via email on high-value leads |

### Google Sheets Fallback (optional)

| Variable | Description |
|---|---|
| `USE_GOOGLE_SHEETS_FALLBACK` | Set to `true` to enable Google Sheets append |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google service account email |
| `GOOGLE_PRIVATE_KEY` | Service account private key (escape `\n`) |
| `GOOGLE_SHEET_ID` | Target Google Sheet ID |
| `GOOGLE_SHEET_RANGE` | Sheet range, default `ExecutiveAILeads!A:Q` |

## Database Setup

1. Open your Supabase project → SQL Editor
2. Run the entire contents of `supabase/schema.sql`
3. Verify the four tables exist:
   - `public.executive_concierge_leads`
   - `public.executive_concierge_lead_events`
   - `public.ai_concierge_sessions`
   - `public.ai_concierge_messages`
4. Confirm RLS is enabled and all deny-all policies are active

## File Structure

```
src/
  app/
    page.tsx                          ← Homepage
    layout.tsx                        ← Root layout (nav + footer + widget)
    services/page.tsx                 ← Services overview
    services/productivity-hub/        ← Phase 1
    services/ai-executive-assistant-integration/  ← Phase 2
    services/personalized-ai-concierge/           ← Phase 3
    services/white-glove-implementations/         ← Phase 4
    operating-model/page.tsx          ← Operating Model
    trust/page.tsx                    ← Trust Center
    privacy/page.tsx                  ← Privacy Policy
    terms/page.tsx                    ← Terms of Service
    apply/page.tsx                    ← Private Inquiry (with form)
    api/
      leads/route.ts                  ← Lead capture (POST)
      concierge-chat/route.ts         ← Chat logging (POST)
      public-encryption-key/route.ts  ← RSA public key (GET)
  components/
    Navigation.tsx                    ← Responsive nav with mobile menu
    Footer.tsx                        ← Full footer with links + trust badges
    ExecutiveHero.tsx                 ← (available for standalone use)
    PhaseCard.tsx                     ← Reusable phase service card
    TrustStrip.tsx                    ← Security badge strip
    InquiryForm.tsx                   ← Encrypted lead capture form
    AIConciergeWidget.tsx             ← Fixed chat widget (bottom-right)
  lib/
    supabaseServer.ts                 ← Lazy Supabase admin client
    leadScoring.ts                    ← Lead qualification scoring
    sheetsFallback.ts                 ← Google Sheets append utility
    sanitize.ts                       ← Input sanitization helpers
  styles/
    globals.css                       ← Tailwind + custom tokens
supabase/
  schema.sql                          ← Full database schema + RLS
```

## Security Checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is **only** set as a server-side env var (never `NEXT_PUBLIC_`)
- [ ] RLS is enabled on all four tables in Supabase
- [ ] Deny-all policies block all browser-origin reads/writes
- [ ] HTTPS is enforced at the hosting layer (Vercel, etc.)
- [ ] Honeypot field is present in the form (`name="website"`)
- [ ] Consent checkboxes are required before submission
- [ ] Server-side validation runs on every `POST /api/leads` request

## Deployment (Vercel)

### Initial Deployment (✅ Complete)

The site has been deployed to Vercel at: **https://executive-ai-concierge-services.vercel.app**

**Completed steps:**
1. Project linked to Vercel (new project)
2. Supabase schema applied to production database
3. Core environment variables added:
   - `SUPABASE_URL` ✅
   - `SUPABASE_ANON_KEY` ✅ (marked sensitive)
   - `SUPABASE_SERVICE_ROLE_KEY` ✅ (marked server-only)

### Configuring Additional Variables

To fully activate encryption and webhooks, add these variables in **Vercel → Project → Settings → Environment Variables**:

**Encryption (Recommended):**
```
LEAD_ENCRYPTION_PUBLIC_KEY_JWK = (your RSA public key in JWK format)
LEAD_ENCRYPTION_PRIVATE_KEY_PEM = (your RSA private key in PEM format) — Mark as Server only
```

**Webhooks (Optional but Recommended):**
```
CRM_WEBHOOK_URL = (your CRM webhook endpoint)
GMAIL_ALERT_WEBHOOK_URL = (your email alert webhook endpoint)
```

**Google Sheets Fallback (Optional):**
```
USE_GOOGLE_SHEETS_FALLBACK = true
GOOGLE_SERVICE_ACCOUNT_EMAIL = (your service account email)
GOOGLE_PRIVATE_KEY = (your service account private key with escaped \n) — Mark as Server only
GOOGLE_SHEET_ID = (your target Google Sheet ID)
GOOGLE_SHEET_RANGE = ExecutiveAILeads!A:Q
```

**Always mark as Server only:**
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEAD_ENCRYPTION_PRIVATE_KEY_PEM`
- `GOOGLE_PRIVATE_KEY`

### Redeploying with New Variables

After adding environment variables in Vercel, trigger a redeploy:

```bash
npx vercel --prod
```

Or redeploy from the Vercel dashboard (Settings → Deployments → Redeploy).

### Post-Deployment Testing

1. Visit https://executive-ai-concierge-services.vercel.app
2. Navigate through all pages — verify no 404 errors
3. Go to `/apply` page
4. Submit a test lead form
5. Check Supabase `executive_concierge_leads` table for new row
6. If webhooks configured, verify high-value leads trigger notifications
7. Monitor Vercel logs for any runtime errors

See `DEPLOYMENT_CHECKLIST.md` for detailed testing procedures.
