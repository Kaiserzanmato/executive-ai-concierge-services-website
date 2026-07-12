# Contributing to Executive AI Concierge Services

Thank you for your interest in contributing! This document provides guidelines for participating in the project.

## 🚀 Getting Started

### 1. Fork & Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/Executive-AI-Concierge-Services.git
cd Executive-AI-Concierge-Services
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

### 3. Install Dependencies
```bash
npm install
cp .env.local.example .env.local
# Fill in environment variables
```

### 4. Start Development
```bash
npm run dev
# Open http://localhost:3000
```

## 📝 Commit Conventions

We use **Conventional Commits** for clear, semantic commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat:** New feature (e.g., `feat(assessment): add step 10 recommendation`)
- **fix:** Bug fix (e.g., `fix(rate-limiter): handle edge case in IP hashing`)
- **refactor:** Code refactoring (e.g., `refactor(scoring): optimize calculations`)
- **docs:** Documentation changes (e.g., `docs: update deployment guide`)
- **test:** Test additions (e.g., `test(assessment): add scoring tests`)
- **chore:** Maintenance (e.g., `chore(deps): upgrade next.js to 15.3`)
- **style:** Code style (e.g., `style: format code with prettier`)

### Scopes
- `assessment` — Assessment wizard & scoring
- `api` — API routes & backend logic
- `db` — Database & schema changes
- `security` — Security & encryption
- `ui` — Frontend components & styling
- `infra` — Deployment & infrastructure
- `docs` — Documentation

### Examples
```bash
git commit -m "feat(assessment): add recommended services to step 10"
git commit -m "fix(api): handle missing resume token gracefully"
git commit -m "docs(readme): update quick start instructions"
```

## ✅ Code Quality

### Before Committing

1. **Type-check**
   ```bash
   npx tsc --noEmit
   ```

2. **Lint**
   ```bash
   npm run lint
   ```

3. **Build**
   ```bash
   npm run build
   ```

All must pass before creating a PR.

### Code Style

- **TypeScript:** Strict mode (no `any`), explicit types
- **React:** Functional components with hooks, no class components
- **Naming:**
  - Components: PascalCase (e.g., `ExecutiveProfileSection`)
  - Functions/variables: camelCase (e.g., `getSupabaseAdmin`)
  - Constants: UPPER_SNAKE_CASE (e.g., `ASSESSMENT_SECTIONS`)
- **Imports:** Absolute paths via `@/*` alias (e.g., `import { scoreAssessment } from '@/lib/assessmentScoring'`)

### Comments

- **Avoid:** Redundant comments that restate the code
- **Use:** Comments explaining **why**, not **what**
- **Example good comment:**
  ```typescript
  // IP hashing prevents storing raw IPs (privacy requirement)
  const ipHash = createHash('sha256').update(ip).digest('hex');
  ```

## 🧪 Testing

### Manual Testing
```bash
# Dev server (hot reload)
npm run dev

# Test assessment flow:
# 1. Navigate to /assessment
# 2. Fill in all 11 steps
# 3. Verify scores display on /assessment/results
# 4. Test report download & email sending
```

### Type & Lint Checks
```bash
npx tsc --noEmit
npm run lint
```

### Build Verification
```bash
npm run build
npm run start
```

## 📋 Pull Request Process

### Before Creating a PR

1. Ensure your branch is up-to-date with `main`
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Push your branch
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Title & Description

**Title Format:**
```
<type>(<scope>): <description>
```

Examples:
- `feat(assessment): add recommended services display to step 10`
- `fix(api): handle null resume tokens correctly`
- `docs: update architecture documentation`

**Description Template:**
```markdown
## Summary
Brief description of the change and why it's needed.

## Changes
- Bullet point 1
- Bullet point 2
- Bullet point 3

## Testing
How to test this change:
1. Step 1
2. Step 2

## Checklist
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Manual testing completed
- [ ] No breaking changes
- [ ] Documentation updated (if needed)
```

### Review Process

1. **Automated Checks:**
   - GitHub Actions runs: `npm run lint`, `npx tsc --noEmit`, `npm run build`
   - Vercel generates preview deployment

2. **Code Review:**
   - At least one code review approval required
   - Address feedback & commit additional changes
   - No force-push after review starts

3. **Merge:**
   - Squash commits before merging (one logical commit per feature)
   - Delete feature branch after merge

## 🔐 Security Guidelines

### Sensitive Data
- **Never commit:**
  - `.env.local` or any `.env.*` file with actual secrets
  - Private keys, API keys, tokens
  - Database credentials
  - Email addresses (unless part of documentation)

- **Always use:**
  - `.env.local.example` as template (commit this, not `.env.local`)
  - Environment variables for secrets
  - Vercel Secrets for production

### Input Validation
- Sanitize all user inputs via `cleanText()` from `lib/sanitize.ts`
- Validate email with regex or email validator
- Enforce length limits on all text fields
- Never trust client-side validation alone

### API Security
- Require `resumeToken` or proper authentication for all endpoints
- Use `getSupabaseAdmin()` with service-role key for backend DB access
- Never expose Supabase anon key or private keys in frontend code
- Implement rate limiting for sensitive endpoints

## 📚 Architecture & Code Patterns

### Adding a New Page

1. Create `src/app/[slug]/page.tsx`
2. Export `metadata` for SEO
3. Use shared components (Navigation, Footer)

Example:
```typescript
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
};

export default function Page() {
  return (
    <>
      <Navigation />
      {/* Your content */}
    </>
  );
}
```

### Adding an API Route

1. Create `src/app/api/[endpoint]/route.ts`
2. Follow pattern: Parse → Sanitize → Validate → Persist → Respond
3. Use `getSupabaseAdmin()` for database access

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { cleanText } from '@/lib/sanitize';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const raw = await req.json();
    const input = cleanText(raw.field, 200);

    if (!input) {
      return NextResponse.json(
        { ok: false, error: 'Field is required.' },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseAdmin()
      .from('table_name')
      .insert({ field: input });

    if (error) {
      console.error('DB insert error:', error.message);
      return NextResponse.json(
        { ok: false, error: 'Unable to save.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { ok: false, error: 'Unexpected error.' },
      { status: 500 }
    );
  }
}
```

### Adding Database Changes

1. Create migration in `supabase/` directory
2. Name format: `supabase/schema-v[N].sql`
3. Document in DEPLOYMENT.md

Example:
```sql
-- supabase/assessment-schema-v3.sql
ALTER TABLE public.executive_concierge_assessment_scores
  ADD COLUMN IF NOT EXISTS new_field text NOT NULL DEFAULT '';
```

## 🐛 Reporting Bugs

### Before Opening an Issue

1. Check existing issues (may already be reported)
2. Verify it's reproducible locally
3. Identify exact steps to reproduce

### Issue Template

```markdown
## Description
Brief description of the bug.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g., macOS 13.5]
- Node version: [e.g., 18.16.0]
- npm version: [e.g., 9.6.4]
- Browser: [e.g., Chrome 115]

## Screenshots
[If applicable]

## Additional Context
[Any other context]
```

## 📖 Documentation

- **ARCHITECTURE.md:** System design, tech stack, deployment
- **DEPLOYMENT.md:** Setup, environment variables, deployment process
- **README.md:** Quick start, features, links to other docs
- **SECURITY.md:** Security practices, encryption, API protection
- **docs/API.md:** All endpoints, request/response examples
- **docs/DATABASE.md:** Schema, migrations, queries

**Update docs when:**
- Adding new features
- Changing API endpoints
- Updating deployment process
- Adding environment variables

## 💡 Tips

1. **Small PRs:** Easier to review, faster to merge
2. **Ask questions:** Open an issue before starting large work
3. **Test locally:** Always run `npm run build` before pushing
4. **Keep it focused:** One feature per PR (no unrelated changes)
5. **Review your own code first:** Catch obvious issues before requesting review

## 🚫 What We Don't Accept

- Unrelated refactoring in feature PRs
- Commits without clear messages
- Code that fails type-check or linting
- Breaking changes without discussion
- Dependencies added without justification

## 📞 Questions?

- Open an issue with label `question`
- Review existing documentation first
- Check architecture & deployment guides

---

**Thank you for contributing! 🙏**

Your efforts help make Executive AI Concierge Services better for everyone.
