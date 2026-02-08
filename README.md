# Automationexercise Playwright (TypeScript)

End-to-end and API test automation scaffolding built on **Playwright** and **TypeScript**.

The repository is currently focused on **configuration and engineering guardrails** (lint, typecheck, environment loading, CI). Tests can be added incrementally without changing the foundational setup.

---

## Technology stack

- **@playwright/test** (test runner)
- **TypeScript** (strict mode)
- **ESLint** + **eslint-plugin-playwright**
- **Husky** (local Git hooks)
- **Docker** + **Docker Compose**
- **GitHub Actions** (CI)

---

## Quick start

### Prerequisites

- Node.js 20.x
- `npm`

### Install

```bash
npm install
npx playwright install
```

### Run tests

```bash
# default: BRAND=brand1, ENV=dev
npm test

# explicit environment
BRAND=brand2 ENV=staging npm test

# cross-browser (adds firefox + webkit)
CROSS_BROWSER=1 BRAND=brand1 ENV=dev npm test
```

---

## Run tests with Docker Compose (local & CI)

Docker Compose is the canonical way to run tests.
```bash
docker compose up --build
```
With explicit parameters:
```bash
ENV=staging BRAND=brand2 CROSS_BROWSER=1 PW_WORKERS=2 docker compose up --build
```
Stop containers:
```bash
docker compose down
```
---

## Environments and brands

This project uses a **2D matrix**:

- `BRAND`: `brand1` | `brand2`
- `ENV`: `dev` | `staging`

Config files:

```
config/
  brand1/
    dev.json
    staging.json
  brand2/
    dev.json
    staging.json
```

Resolution rules:

1. If `BASE_URL` is set, it overrides `baseUrl` from the JSON file.
2. Otherwise the config is loaded from `config/<brand>/<env>.json`.
3. The run fails fast if the file is missing or values are invalid.

More details: see `ENVIRONMENT_SETUP.md`.

---

## Reports and artifacts

Playwright outputs are intentionally consolidated under `artifacts/`:

- `artifacts/playwright-report/` — HTML report
- `artifacts/test-output/` — Playwright test output directory
- `artifacts/junit.xml` — JUnit report
- `artifacts/results.json` — JSON results

The same structure is used locally and in CI.

---

## Quality gates

### Local gates (Husky)

Local hooks provide fast feedback before push:

- `commit-msg` — enforces Conventional Commit format
- `pre-push` — runs `npm run typecheck` and `npm run test:smoke`

> Hooks can be bypassed with `--no-verify`. CI remains the source of truth.

### CI gates (GitHub Actions)

CI runs on pull requests targeting `main` / `master` only
(events: `opened`, `synchronize`, `reopened`, `ready_for_review`).

`main` branch is protected: a pull request cannot be merged until the CI checks pass.

1. Install dependencies
2. ESLint (fail-fast)
3. TypeScript typecheck (fail-fast)
4. Install Playwright browsers (only when test files exist)
5. Run Playwright tests (only when test files exist)
6. Upload artifacts

Husky is disabled in CI to avoid side effects:

```yaml
env:
  HUSKY: 0
```

---

## Common commands

```bash
npm run lint         # static analysis
npm run lint:fix     # auto-fix where possible
npm run typecheck    # TypeScript compilation checks
npm test             # all tests
npm run test:smoke   # subset tagged with @smoke

# Convenience scripts
npm run test:brand1:dev
npm run test:brand1:staging
npm run test:brand2:dev
npm run test:brand2:staging
```

---

## Design rationale (testing perspective)

The setup aligns with standard test-control and risk-reduction practices:

- **Fail-fast**: inexpensive checks (lint/typecheck/config validation) run before costly execution.
- **Determinism**: environment resolution is explicit and validated before tests start.
- **Traceability**: CI artifacts provide evidence for investigation and audit.

---

## License

Internal / educational use.
