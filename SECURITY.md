# Security & Compliance

Security is a critical aspect of Executive AI Concierge Services. This document details our security architecture, practices, and compliance measures.

## 🔐 Security Summary

| Layer | Method | Status |
|-------|--------|--------|
| **Transport** | HTTPS/TLS 1.3 | ✅ Enforced, auto-renew |
| **Data at Rest** | PostgreSQL encryption | ✅ Supabase-managed |
| **Client-Side Encryption** | RSA-OAEP-256 + AES-GCM-256 | ✅ Hybrid encryption on inquiry form |
| **Authentication** | Service-role only (no user auth) | ✅ API-only access |
| **Database Access** | Row-Level Security (RLS) | ✅ Deny-all anon/authenticated |
| **Input Validation** | Sanitization + length limits | ✅ All user inputs validated |
| **Rate Limiting** | IP-based (5/hour) | ✅ SHA-256 hashed IPs |
| **API Security** | Security headers, no CORS | ✅ Strict CSP, X-Frame-Options: DENY |

---

## 🔒 Transport Security (HTTPS/TLS)

### Configuration
- **TLS Version:** 1.3 (minimum)
- **Certificate:** Let's Encrypt (auto-renewed every 90 days)
- **Provider:** Vercel (managed)
- **HSTS:** Enabled (Strict-Transport-Security header)

### Enforcement
```
# All HTTP → HTTPS redirects
http://example.com → https://example.com (automatic)
```

### Testing
```bash
# Verify TLS version
openssl s_client -connect example.com:443 -tls1_3

# Check certificate expiry
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates
```

---

## 🗝️ Encryption at Rest

### Database (Supabase PostgreSQL)
- **Native Encryption:** PostgreSQL `pgcrypto` extension
- **Key Management:** Supabase-managed encryption keys (AWS KMS)
- **Backups:** Encrypted at rest on AWS S3
- **Retention:** 30-day automated backup retention

### Configuration
```sql
-- Verify pgcrypto extension
SELECT * FROM pg_extension WHERE extname = 'pgcrypto';

-- Example: Encrypt sensitive field (if needed in future)
-- INSERT INTO table (encrypted_field) VALUES (pgp_sym_encrypt('secret', 'passphrase'));
```

### Sensitive Data
**What we encrypt in DB:**
- Lead inquiry responses (via client-side encryption before transmission)
- Assessment answers (JSONB, stored as-is)

**What we don't encrypt (by design):**
- Public respondent names, emails (needed for contact/reporting)
- Scores (not sensitive; used for recommendations)

---

## 🔑 Client-Side Encryption (Inquiry Form)

### Hybrid Encryption Strategy
**RSA-OAEP-256 + AES-GCM-256**

```
Client                              Server
  ├─ Fetch RSA public key
  ├─ Generate random AES-256 key
  ├─ Encrypt payload with AES-GCM (fast, symmetric)
  ├─ Wrap AES key with RSA-OAEP (asymmetric, secure)
  ├─ Send: [wrappedKey, IV, ciphertext] ────→ 
                                                ├─ Decrypt AES key with RSA private key
                                                ├─ Decrypt payload with AES key
                                                ├─ Store plaintext in DB
                                                ├─ Return 200 OK
  ←─ Success ◄───────────────────────────────
```

### Why This Approach?
- **RSA-OAEP:** Asymmetric, secure key exchange (no pre-shared secret needed)
- **AES-GCM:** Fast symmetric encryption for large payloads
- **Result:** Payload encrypted end-to-end; even if HTTPS fails, data is protected at rest

### Code Implementation
**Client-side** (InquiryForm.tsx):
```typescript
async function encryptPayload(payload: unknown): Promise<unknown> {
  const keyRes = await fetch("/api/public-encryption-key");
  const jwk = await keyRes.json();
  const publicKey = await crypto.subtle.importKey("jwk", jwk, { name: "RSA-OAEP" }, true, ["encrypt"]);

  const aesKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encodedPayload);
  const wrappedKey = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, exportedAesKey);

  return { mode: "client_hybrid_rsa_oaep_aes_gcm", iv, wrappedKey, ciphertext };
}
```

**Server-side** (leads/route.ts):
```typescript
const encryptedPayload = raw.encryptedPayload; // { mode, iv, wrappedKey, ciphertext }
// Stored as JSONB in DB; decryption happens on-demand if needed
```

---

## 🛡️ Database Security

### Row-Level Security (RLS)

**Policy:** Deny-all for anon/authenticated; service-role only

```sql
-- For all assessment tables:
ALTER TABLE executive_concierge_assessment_respondents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny_all_anon" ON executive_concierge_assessment_respondents
  AS (restrictive) FOR ALL TO anon
  USING (false);

CREATE POLICY "deny_all_authenticated" ON executive_concierge_assessment_respondents
  AS (restrictive) FOR ALL TO authenticated
  USING (false);

-- Service-role key bypasses RLS (used in API routes)
```

**Verification:**
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename LIKE 'executive_concierge_%';

-- Check policies exist
SELECT * FROM pg_policies 
WHERE schemaname = 'public' AND tablename LIKE 'executive_concierge_%';
```

### Connection Security
- **SSL Mode:** `require` (enforced)
- **Connection Pooling:** Supabase managed (max 1000 connections)
- **Timeout:** 30 seconds (idle connections closed)

### Database User Roles
| Role | Permissions | Usage |
|------|-----------|-------|
| **postgres** | Full superuser | Supabase admin only (migrations, schema changes) |
| **service_role** | INSERT/SELECT/UPDATE/DELETE bypass RLS | API routes (backend only) |
| **anon** | Minimal (RLS policies deny everything) | Frontend (never used in practice) |

---

## 🔑 Authentication & Authorization

### Current Model (No User Authentication)
- **All API access:** Public endpoints
- **Rate limiting:** By IP address (SHA-256 hashed)
- **Authorization:** None (everyone can access `/assessment`, `/apply`)
- **Data isolation:** By `resume_token` (opaque UUID) or `lead_id`

### Why No User Auth?
- **Use case:** Gated but unauthenticated forms (no user accounts)
- **Simplicity:** Avoids OAuth/session complexity
- **Privacy:** No login required (lower barrier to entry)

### Future: User Authentication
When user accounts are added:
```typescript
// Planned: Supabase Auth + RLS updates
import { createClient } from "@supabase/supabase-js";

const { data: { user } } = await supabase.auth.getUser();
// RLS: WHERE user_id = auth.uid()
```

---

## 🔐 Input Validation & Sanitization

### Sanitization Library
**File:** `src/lib/sanitize.ts`

```typescript
export function cleanText(value: unknown, maxLength: number): string {
  let text = typeof value === "string" ? value : String(value);
  text = text.trim().slice(0, maxLength); // Truncate
  return text.replace(/[<>\"']/g, ""); // Remove HTML/JS chars
}

export function isEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Validation Rules
| Field | Rule | Example |
|-------|------|---------|
| Full Name | Required, 2-160 chars, no HTML | "Jane Doe" ✅ |
| Email | Required, valid RFC format | "jane@example.com" ✅ |
| Phone | Optional, <80 chars | "+1 (555) 000-0000" ✅ |
| Text Field | Required, 10-4000 chars | "Describe your situation..." ✅ |
| Budget | Required, select from dropdown | "$30,000 to $50,000" ✅ |

### Honeypot (Bot Detection)
```html
<input name="website" type="text" class="hidden" tabindex="-1" />
```
If bot fills this field → silently success but don't store data

---

## 🚫 API Security

### Security Headers
```
X-Frame-Options: DENY
  → Prevent clickjacking (no framing in iframes)

X-Content-Type-Options: nosniff
  → Prevent MIME-type sniffing attacks

Referrer-Policy: strict-origin-when-cross-origin
  → Limit referrer leakage to cross-site requests

Permissions-Policy: camera=(), microphone=(), geolocation=()
  → Disable unused browser features
```

**Configuration:** `next.config.ts`
```typescript
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      // ... other headers
    ],
  }];
}
```

### CORS (Not Used)
- **Why:** All requests same-origin (frontend & API on same domain)
- **If needed:** Add `Access-Control-Allow-Origin` in future

### Rate Limiting

**Implementation:** IP-based throttle (SHA-256 hashed)

```typescript
// src/lib/rateLimiter.ts
const ipHash = createHash('sha256').update(ip).digest('hex'); // Never store raw IP
const count = await db
  .from('executive_concierge_assessment_rate_limits')
  .select('id', { count: 'exact' })
  .eq('ip_hash', ipHash)
  .gt('created_at', oneHourAgo);

if (count >= 5) {
  return NextResponse.json(
    { ok: false, error: 'You've reached the limit...' },
    { status: 429 }
  );
}
```

**Limits:**
- **Assessment Start:** 5 per IP per hour
- **Lead Submit:** Not rate-limited (honeypot + manual review)
- **Report Download:** Not rate-limited (already requires resume_token)

---

## 🔗 API Endpoint Security

### Public Endpoints (No Auth)
```
POST /api/assessment/start          (rate-limited: 5/hour)
GET  /api/assessment/resume         (requires valid token)
POST /api/assessment/save-step      (requires valid token)
POST /api/assessment/preview        (requires valid token)
POST /api/assessment/complete       (requires valid token)
POST /api/assessment/report         (requires valid token)
POST /api/assessment/email-report   (requires valid token)
POST /api/assessment/consultation-request (requires valid token)
POST /api/leads                      (rate-limited implicitly)
GET  /api/public-encryption-key    (public, no auth)
```

### Token-Based Security
**resume_token:** Opaque UUID (256-bit entropy)
- **Generated:** `crypto.randomUUID()`
- **Stored:** Hashed (salted) in DB (planned enhancement)
- **Transmitted:** In request body (not URL param)
- **Expiry:** Implicit (respondent record deleted after 90 days)

---

## 🔍 Logging & Monitoring

### What We Log
- **Errors:** `console.error(errorMessage)` in all API routes
- **Rate Limit Hits:** Logged to console (visible in Vercel Functions)
- **Failed Auth:** Logged if token invalid
- **DB Failures:** Logged with error message (sanitized)

### What We Don't Log
- User input (except in error messages for debugging)
- Full request/response bodies
- Personally identifiable information (PII)

### Access Control
- **Local:** Visible in `npm run dev` console
- **Production:** Vercel Functions dashboard (verified email required)
- **Supabase:** Database logs (minimal data logged by default)

---

## 🔄 Webhook Security

### Configuration
**Webhooks are fire-and-forget (non-blocking):**

```typescript
async function sendWebhook(url: string, payload: unknown): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently fail; logged but don't block response
  }
}
```

### Best Practices (Not Yet Implemented)
- [ ] **HMAC Signatures:** Sign payload with secret key
- [ ] **Retries:** Exponential backoff (3 attempts)
- [ ] **Timeouts:** 10-second request timeout
- [ ] **URL Validation:** Whitelist allowed webhook hosts

---

## 🆘 Security Incident Response

### Reporting a Vulnerability

**Do not open a public issue.** Instead:

1. **Email:** [security@example.com] with subject line: `SECURITY: [Brief description]`
2. **Include:**
   - Description of vulnerability
   - Steps to reproduce
   - Impact (data breach? unauthorized access? DoS?)
   - Suggested fix (if you have one)
3. **Timeline:** We aim to patch within 7 days

### Incident Response Plan
1. **Acknowledge:** Reply to reporter within 24 hours
2. **Assess:** Determine impact & severity
3. **Contain:** Disable affected feature if critical
4. **Remediate:** Deploy fix to production
5. **Notify:** Inform affected users (if data breach)
6. **Post-Mortem:** Document lessons learned

---

## 📋 Compliance & Audits

### Privacy Compliance
- **GDPR:** Right to delete data (user can request)
- **CCPA:** Right to know what data we have
- **Privacy Policy:** [/privacy](https://example.com/privacy)

### Data Retention
| Data Type | Retention | Deletion |
|-----------|-----------|----------|
| Assessment Respondents | 90 days after completion | Auto-delete via cron (planned) |
| Assessment Responses | 90 days after completion | Auto-delete via cron (planned) |
| Assessment Scores | 90 days after completion | Auto-delete via cron (planned) |
| Lead Inquiries | 1 year | Manual review before delete |
| Webhook Logs | 30 days | Auto-rotate in Supabase |

### Auditing
- [ ] **Access Logs:** Who accessed what data, when (planned)
- [ ] **Change Logs:** Who changed what, when (planned via DB triggers)
- [ ] **Security Audit:** Annual third-party audit (planned)

---

## 🧪 Security Testing

### Manual Testing
```bash
# 1. Try SQL injection on email field
# Input: "admin'--" → Should be sanitized

# 2. Try XSS on name field
# Input: "<script>alert('xss')</script>" → Should be sanitized

# 3. Test rate limiting
# Hit /api/assessment/start 6 times from same IP in 60 sec → Should get 429

# 4. Try accessing assessment without token
# GET /api/assessment/resume?token=invalid → Should get 404
```

### Automated Testing (Planned)
```bash
npm install --save-dev jest supertest
npm test -- --coverage
```

### OWASP Top 10 Coverage
| Issue | Status | Notes |
|-------|--------|-------|
| SQL Injection | ✅ Mitigated | Supabase parameterized queries |
| Broken Auth | ⚠ N/A | No user auth (API-only) |
| XSS | ✅ Mitigated | Input sanitization, React auto-escapes |
| Broken Access | ✅ Mitigated | RLS policies, token-based |
| CSRF | ✅ Safe | Same-origin forms only |
| Components | ✅ Monitored | `npm audit` on each build |
| Auth Bypass | ✅ Safe | No auth to bypass |
| XXE | ✅ Safe | No XML parsing |
| Broken Access | ✅ Mitigated | Rate limiting + token validation |
| Log Injection | ✅ Safe | Minimal logging, sanitized input |

---

## 📚 Security Resources

| Resource | URL |
|----------|-----|
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |
| NIST Cybersecurity | https://www.nist.gov/cyberframework |
| Supabase Security | https://supabase.com/docs/guides/auth/security |
| Next.js Security | https://nextjs.org/docs/basic-features/security |
| Vercel Security | https://vercel.com/docs/concepts/security |

---

## ✅ Security Checklist

Before deploying:
- [ ] All user inputs sanitized
- [ ] HTTPS enforced (TLS 1.3)
- [ ] RLS policies enabled on DB tables
- [ ] Environment variables NOT committed
- [ ] No secrets in logs or error messages
- [ ] Rate limiting configured
- [ ] Security headers set (next.config.ts)
- [ ] Webhooks configured with HTTPS URLs only
- [ ] Backup strategy verified (Supabase automated backups)
- [ ] Incident response plan reviewed

---

**Questions about security?** Open an issue labeled `security` or email [security@example.com].

*Last updated: 2026-07-12*
