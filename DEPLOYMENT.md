# Deployment Guide

Complete instructions for deploying Executive AI Concierge Services to production (Vercel) and staging environments.

## 🚀 Quick Start

### 1. Vercel Setup (First Time)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### 2. Environment Variables

Copy `.env.local.example` → `.env.local` and fill in values:

```bash
# Copy template
cp .env.local.example .env.local

# Edit with your values
nano .env.local  # or open in your editor
```

### 3. GitHub Integration

Connect GitHub to Vercel for auto-deployment:
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import from GitHub repository
4. Set environment variables in Vercel dashboard
5. Click "Deploy"

**From this point:** Every push to `main` auto-deploys to production

---

## 📋 Required Environment Variables

### Database (Supabase)

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
```

**How to get these:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API → Copy the keys

### Encryption Keys

```
LEAD_ENCRYPTION_PUBLIC_KEY_JWK={"kty":"RSA","e":"AQAB","n":"...","alg":"RSA-OAEP-256","ext":true}
LEAD_ENCRYPTION_PRIVATE_KEY_PEM=-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----
```

**How to generate:**
```bash
# Generate RSA key pair
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# Convert to JWK (use online tool: https://jwkset.com/ or node-jose library)
# Copy private.pem content to LEAD_ENCRYPTION_PRIVATE_KEY_PEM
# Convert public.pem to JWK format for LEAD_ENCRYPTION_PUBLIC_KEY_JWK
```

---

## 🔧 Optional Environment Variables

### Email Delivery (Resend)

```
RESEND_API_KEY=your_resend_api_key_here
```

**Setup:**
1. Go to https://resend.com
2. Create account & API key
3. Add to Vercel secrets

**If not set:** Email report feature gracefully fails with user-friendly message

### CRM Webhooks

```
CRM_WEBHOOK_URL=https://your-crm.com/webhooks/leads
ASSESSMENT_CONSULTATION_WEBHOOK_URL=https://your-crm.com/webhooks/consultations
GMAIL_ALERT_WEBHOOK_URL=https://your-email-system.com/alert
```

**Fired when:**
- High-value lead submitted (CRM_WEBHOOK_URL)
- Assessment completed with consultation recommendation (ASSESSMENT_CONSULTATION_WEBHOOK_URL)
- High-value lead submitted (GMAIL_ALERT_WEBHOOK_URL)

**If not set:** Webhook fires fail silently (logged but don't block response)

### Google Sheets Fallback

```
USE_GOOGLE_SHEETS_FALLBACK=false
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SHEET_RANGE=ExecutiveAILeads!A:Q
```

**Setup (only if using Sheets fallback):**
1. Create Google Cloud project
2. Enable Google Sheets API
3. Create service account & download JSON key
4. Extract `client_email` → GOOGLE_SERVICE_ACCOUNT_EMAIL
5. Extract `private_key` → GOOGLE_PRIVATE_KEY (preserve newlines)
6. Create Google Sheet & share with service account email
7. Copy Sheet ID from URL → GOOGLE_SHEET_ID

---

## 🏗️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "New project"
3. Fill in: Organization, Project name, Database password, Region
4. Wait for provisioning (~2 min)

### 2. Run Migrations

```bash
# Connect to Supabase SQL Editor
# Copy & paste each migration file in order

# Initial schema (creates all tables, RLS, indexes)
cat supabase/assessment-schema.sql

# V2 migration (adds recommended_services, suggested_next_step columns)
cat supabase/assessment-schema-v2.sql
```

**In Supabase:**
1. Go to SQL Editor
2. Paste migration SQL
3. Click "Run"
4. Verify tables created: Table view → check `executive_concierge_*` tables

### 3. Verify RLS Policies

```sql
-- Check that RLS is enabled for all assessment tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename LIKE 'executive_concierge_%';

-- All should return 't' (true) for rowsecurity
```

---

## 🚢 Vercel Deployment

### Automatic Deploy (Recommended)

**Setup GitHub integration once, then:**
1. Commit changes locally
2. Push to GitHub: `git push origin main`
3. Vercel auto-detects → builds & deploys

**What happens:**
- GitHub Actions runs: lint, type-check, build
- Vercel receives build success → deploys to production
- Live at: https://executive-ai-concierge-services.vercel.app

### Manual Deploy

```bash
# One-time: Link Vercel project
vercel link

# Deploy to production
vercel --prod

# View logs
vercel logs
```

### Preview Deployments

Every branch gets a preview URL (useful for testing before merge):
```bash
# Push feature branch
git push origin feature/new-feature

# Vercel auto-creates: https://pr-123.vercel.app (example)
# URL shown in GitHub PR comments
```

---

## 🔐 Setting Environment Variables in Vercel

### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select project → Settings → Environment Variables
3. Add each variable:
   - **Name:** SUPABASE_URL
   - **Value:** (paste your Supabase URL)
   - **Environments:** Production, Preview, Development
4. Click "Save"
5. Repeat for all variables
6. **Re-deploy:** Vercel automatically redeploys with new env vars

### Via Vercel CLI

```bash
vercel env add SUPABASE_URL
# (paste value when prompted)

vercel env add SUPABASE_ANON_KEY
# (repeat for all variables)

vercel --prod
# Deploy with new env vars
```

---

## 📊 Monitoring & Logging

### Vercel Dashboard
- **Deployments:** View all deploy history, rollback if needed
- **Functions:** API route logs, errors, execution time
- **Analytics:** Traffic, errors, performance metrics
- **Usage:** Bandwidth, serverless function invocations

**Access:** https://vercel.com/dashboard → Project → Deployments/Functions

### Supabase Dashboard
- **Query Performance:** Slow query analysis
- **Connections:** Connection pool status
- **Logs:** Database query logs (if enabled)
- **Backups:** Backup schedule, restore points

**Access:** https://supabase.com/dashboard → Project → Monitoring

### Local Logs

```bash
# View Vercel function logs
vercel logs

# View live logs (streaming)
vercel logs --follow
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Automatically runs on every push:

```yaml
# .github/workflows/ci.yml (auto-generated by Vercel)
- Install dependencies
- Run ESLint (lint)
- Run TypeScript type-check
- Run Next.js build
- Deploy to Vercel (if all pass)
```

**Skip CI:** Add `[skip ci]` to commit message (rarely needed)

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `npm ERR! ERR! code E404`
- **Cause:** Missing npm package
- **Fix:** Check package.json, reinstall: `npm install`

**Error:** `TypeScript error TS2304: Cannot find name 'X'`
- **Cause:** Type missing or import wrong
- **Fix:** Check imports, run `npx tsc --noEmit` locally first

**Error:** `SUPABASE_URL is not defined`
- **Cause:** Environment variable not set in Vercel
- **Fix:** Add to Vercel dashboard → Settings → Environment Variables

### Database Connection Fails

**Error:** `FATAL: too many connections`
- **Cause:** Connection pool exhausted
- **Fix:** Restart Supabase project (Settings → Database → Restart)

**Error:** `RLS policy violation`
- **Cause:** Using anon key instead of service-role key in API
- **Fix:** Verify `getSupabaseAdmin()` uses service-role key

### Rate Limiting Issues

**Problem:** Users see "You've reached the limit" incorrectly
- **Cause:** IP hashing issue or clock skew
- **Fix:** Check Supabase rate_limits table, verify server time sync

---

## 📅 Maintenance

### Weekly
- Monitor Vercel & Supabase dashboards for errors
- Check application logs for unusual patterns
- Review Sentry (if set up) for new errors

### Monthly
- Review analytics: traffic, errors, performance trends
- Check for security updates: `npm audit`
- Update dependencies: `npm update` (test first locally)

### Quarterly
- Capacity planning: Assess usage growth
- Cost optimization: Review Vercel/Supabase pricing tiers
- Security review: Audit access logs, verify RLS policies

---

## 🆘 Emergency Rollback

If production is broken:

### Vercel Rollback
1. Go to https://vercel.com/dashboard → Deployments
2. Find last known-good deployment
3. Click "..." → "Promote to Production"
4. Verify site is working

### Git Rollback (Last Resort)
```bash
# Find broken commit
git log --oneline

# Revert the commit
git revert <commit-hash>

# Push (auto-deploys)
git push origin main
```

---

## 📞 Support

| Issue | Contact |
|-------|---------|
| Vercel deployment | https://vercel.com/support |
| Supabase database | https://supabase.com/docs |
| TypeScript/Next.js | https://nextjs.org/docs |
| GitHub Actions | https://github.com/actions/toolkit |

---

**Ready to deploy?**
1. ✅ Fill environment variables in Vercel dashboard
2. ✅ Run Supabase migrations
3. ✅ Connect GitHub repository
4. ✅ Push to main branch
5. ✅ Monitor deployment (takes ~2-5 min)
6. ✅ Test production URL

Questions? See [README.md](./README.md) or [CONTRIBUTING.md](./CONTRIBUTING.md).
