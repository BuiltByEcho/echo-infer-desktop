# Error handling notes

Echo Infer Desktop should surface actionable local errors without exposing secrets or upstream service branding.

## Goals

- Keep provider/API failures visible to users with enough context to fix configuration.
- Redact API keys, bearer tokens, cookies, and local private paths from logs and reports.
- Prefer Echo Infer setup guidance for the default provider.
- Keep low-level compatibility identifiers in code only when changing them would risk migrations or telemetry continuity.

## Release checklist

- Run `pnpm run check` before packaging.
- Smoke the default Echo Infer provider screen and onboarding flow.
- Confirm visible errors do not reference removed upstream services unless the user intentionally selected a legacy provider.
