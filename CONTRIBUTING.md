# Contributing Guidelines

This document describes contribution rules and quality expectations for this repository.

---

## 🧩 General Principles

- Quality is enforced through automation.
- Every change must be readable, reviewable, and traceable.
- CI validation is authoritative.

---

## 📝 Commit Message Rules (Conventional Commits)

All commits must follow the Conventional Commits format:

```
<type>(<scope>)?: <subject>
```

### Allowed types

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

### Examples

```
test(smoke): add login smoke test
fix(api): handle expired token
ci: add typecheck step to workflow
```

---

## 🔐 Git Hooks (Husky)

The project uses **Husky** to enforce local quality gates.

### Active hooks

- `commit-msg` — validates commit message format
- `pre-push` — runs:
  - `npm run typecheck`
  - `npm run test:smoke`

Hooks are version-controlled under `.husky/`.

Hooks can be bypassed with `--no-verify`, but CI validation will still apply.

---

## 🧪 CI Validation

All pushes and pull requests trigger the CI pipeline.

CI always runs:
- ESLint
- TypeScript typecheck
- Playwright tests

CI is authoritative — a green local push does not guarantee mergeability.

---

## 🛠 Local Setup

```bash
npm install
npx playwright install
```

Recommended Node.js version: **20.x**

---

## ❗ Bypassing Hooks (Exceptional Cases)

```bash
git commit --no-verify
git push --no-verify
```

Use only when hooks are broken or for exceptional cases.
All changes must still pass CI.

---

## 📌 Final Notes

If contribution rules change, documentation and hooks must be updated together.
