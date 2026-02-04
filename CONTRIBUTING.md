# Contributing

This repository is a Playwright + TypeScript test automation scaffold. Contributions should preserve determinism, readability, and CI repeatability.

The rules below are intended to support predictable test outcomes and efficient defect analysis (test control and traceability principles).

---

## Workflow expectations

- Prefer small, reviewable pull requests.
- Keep changes isolated (docs vs. config vs. test logic) when practical.
- CI validation is authoritative; local gates are convenience only.

---

## Commit messages (Conventional Commits)

All commits must follow:

```
<type>(<scope>)?: <subject>
```

Allowed `type` values:

- `feat` — new functionality
- `fix` — bug fix
- `test` — tests (any level)
- `refactor` — refactoring without behavior change
- `docs` — documentation
- `style` — formatting, linting
- `perf` — performance improvements
- `build` — build system or dependencies
- `ci` — CI/CD changes
- `chore` — maintenance tasks
- `revert` — revert previous commit

Examples:

```
test(smoke): add login smoke test
fix(api): handle expired token
ci: upload artifacts directory
```

---

## Local quality gates (Husky)

Active hooks in `.husky/`:

- `commit-msg` — blocks invalid commit message format
- `pre-push` — runs:
  - `npm run typecheck`
  - `npm run test:smoke`

Notes:

- Hooks can be bypassed with `--no-verify`.
- CI remains the source of truth.
- If hooks change, documentation must be updated in the same pull request.

---

## CI validation

GitHub Actions runs on every push and pull request.

Current pipeline:

1. Install dependencies
2. Lint (fail-fast)
3. Typecheck (fail-fast)
4. Detect whether test files exist
5. If tests exist:
  - Install Playwright browsers
  - Run Playwright tests
  - Upload artifacts

Rationale:

- Static checks provide early feedback.
- Skipping test execution when no tests exist prevents false failures during project bootstrapping.

---

## Environments, brands, and secrets

### Configuration

Tests are configured using a 2D matrix:

- `BRAND`: `brand1` | `brand2`
- `ENV`: `dev` | `staging`

Config files:

```
config/<brand>/<env>.json
```

`BASE_URL` overrides the JSON `baseUrl` value.

### Secrets

Repository JSON config files reference **environment variable names**, not raw credentials.

For CI:

- Store secret values in GitHub Actions secrets.
- Map secrets to the variable names referenced by the config (e.g., `BRAND1_DEV_USERNAME`).

Avoid committing any secrets or tokens.

---

## Adding tests

When adding tests, keep the following structure goals:

- Tests contain only test intent and assertions.
- Reusable actions and components live in `src/`.
- Avoid `waitForTimeout`; use Playwright’s web-first assertions and stable locators.

Tagging:

- Use `@smoke` for minimal checks that can run quickly.
- Use `@regression` (optional) for broader coverage.

---

## Code style

- Keep TypeScript strict-mode clean (`npm run typecheck` must be green).
- Keep ESLint clean (`npm run lint` must be green).
- Prefer explicit environment control and deterministic behavior.

---

## Troubleshooting

### CI uploads are empty

This project writes reports under `artifacts/`. Ensure the workflow uploads `artifacts/` (not only default Playwright folders).

### Husky errors in non-git environments

When the repository is copied without `.git` (e.g., downloaded as a ZIP), Husky may warn. This does not occur when the project is cloned normally.

---

## CI execution

CI uses the same docker-compose.yml as local runs:

1. Lint
2. Typecheck
3. docker compose build
4. docker compose up
5. Upload artifacts/

This ensures identical runtime semantics.

