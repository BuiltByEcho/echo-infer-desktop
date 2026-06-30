# AI provider architecture

Echo Infer Desktop uses a registry-based provider system for OpenAI-compatible and vendor-specific model backends.

## Key files

- `src/shared/providers/index.ts` — provider registry entry point.
- `src/shared/providers/definitions/` — provider definitions and model factories.
- `src/shared/defaults.ts` — Echo Infer default endpoint/model configuration.
- `src/renderer/routes/settings/provider/` — provider settings UI.
- `src/shared/model-registry/provider-mapping.ts` — mapping between local provider IDs and models.dev provider IDs.

## Echo Infer defaults

The beta build should prefer:

- provider: Echo Infer
- base URL: `https://infer.builtbyecho.xyz/v1`
- default model: `echo-private`

Legacy provider identifiers may remain in source where needed for migration or compatibility, but public docs and visible UI should use Echo Infer naming.

## Verification

```bash
pnpm exec vitest run src/shared/defaults.test.ts src/shared/providers/index.contract.test.ts src/renderer/utils/echoInferSettingsRoutes.test.ts
pnpm run check
```
