# Playwright + TypeScript QA Project

This repository contains an automated testing setup based on **Playwright** and **TypeScript**.
The project focuses on early defect detection, deterministic CI validation, and consistent engineering practices.

---

## 🧱 Technology Stack

- TypeScript
- Playwright
- ESLint
- Husky (Git hooks)
- GitHub Actions (CI)

---

## 📁 Project Structure (high level)

```
.
├── src/                  # Shared utilities, helpers, pages, fixtures
├── tests/                # Playwright tests (e2e / smoke)
├── .husky/               # Git hooks (pre-commit, pre-push, commit-msg)
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/ci.yml
```

---

## 🧪 Quality Gates

### Local (Husky Git hooks)

Local checks provide fast feedback before changes are pushed.

| Hook        | Purpose |
|------------|---------|
| `commit-msg` | Enforces Conventional Commit message format |
| `pre-push`   | Runs TypeScript typecheck and smoke tests |

Hooks can be bypassed using `--no-verify`, therefore they are **not a replacement for CI**.

---

### Continuous Integration (GitHub Actions)

CI is the **single source of truth** for validation.

Pipeline steps:
1. Install dependencies
2. ESLint (fail-fast)
3. TypeScript typecheck (fail-fast)
4. Install Playwright browsers
5. Run Playwright tests
6. Upload reports and artifacts

Husky is disabled in CI to avoid side effects:

```yaml
env:
  HUSKY: 0
```

---

## ▶️ Common Commands

```bash
npm run lint        # ESLint static analysis
npm run typecheck   # TypeScript type check (tsc --noEmit)
npm test            # Playwright tests
npm run test:smoke  # Smoke test subset
```

---

## 🧠 Design Principles

- **Fail-fast**: inexpensive static checks run before expensive test execution
- **Shift-left**: defects are detected as early as possible
- **Determinism**: CI does not depend on local Git hooks
- **Transparency**: hooks and rules are version-controlled

---

## 📌 Notes

Smoke tests are executed:
- locally (pre-push) for fast feedback,
- in CI for clean-environment validation.

This duplication is intentional and aligned with quality gate practices.

---

## 📄 License

Internal / educational use.
