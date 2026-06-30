# Adding or changing a provider

This checklist covers provider work in Echo Infer Desktop.

## Main files

- `src/shared/providers/` — provider registry and defaults.
- `src/shared/defaults.ts` — Echo Infer endpoint/model defaults.
- `src/renderer/routes/settings/provider/` — provider settings pages.
- `src/renderer/utils/echoInferSettingsRoutes.test.ts` — settings/provider contract coverage.
- `src/shared/providers/index.contract.test.ts` — provider registry contract coverage.

## Checklist

1. Add or update the provider registry entry.
2. Add settings UI copy that is safe for a public beta.
3. Avoid committing credentials; ship endpoint/model aliases only.
4. Add or update contract tests for visibility and defaults.
5. Run:

```bash
pnpm exec vitest run src/shared/defaults.test.ts src/shared/providers/index.contract.test.ts src/renderer/utils/echoInferSettingsRoutes.test.ts
pnpm run check
```
