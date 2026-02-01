# Environment & Brand configuration (Playwright)

This setup supports a 2D environment matrix:

- `BRAND`: `brand1` | `brand2`
- `ENV`: `dev` | `staging`

Config files live under:

- `config/brand1/dev.json`
- `config/brand1/staging.json`
- `config/brand2/dev.json`
- `config/brand2/staging.json`

## Running tests

Use BRAND + ENV (recommended):

- `BRAND=brand1 ENV=dev npm test`
- `BRAND=brand2 ENV=staging npm test`

Override URL explicitly (ad-hoc):

- `BASE_URL=https://custom.example.com BRAND=brand1 ENV=dev npm test`

Cross-browser run:

- `CROSS_BROWSER=1 BRAND=brand1 ENV=dev npm test`

Parallelism override:

- `PW_WORKERS=2 BRAND=brand1 ENV=dev npm test`

Headless override (local debug):

- `PW_HEADLESS=0 BRAND=brand1 ENV=dev npm test`

## Secrets

Example config files reference environment variable names for credentials, e.g.:

- `BRAND1_DEV_USERNAME`
- `BRAND1_DEV_PASSWORD`

Store secret values in your CI/CD secret store (GitHub Actions Secrets), not in repo JSON.
