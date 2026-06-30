# Echo Infer Desktop

![Built by Echo banner](assets/echo-banner.jpeg)

Echo Infer Desktop is the BuiltByEcho desktop client for private, OpenAI-compatible inference. It ships with Echo Infer defaults, Echo branding, and a focused desktop chat experience for local users and Bankr inference workflows.

## Defaults

- API base URL: `https://infer.builtbyecho.xyz/v1`
- Default chat model: `echo-private`
- Included Echo route aliases: `echo-private`, `echo-fast`, `echo-best`
- Primary web dashboard: <https://chat.builtbyecho.xyz>

Users still need to paste an Echo Infer API key in provider settings before making authenticated chat requests.

## Development

```bash
pnpm install
pnpm exec vitest run src/shared/defaults.test.ts src/shared/providers/index.contract.test.ts
pnpm run build
```

## Release build

```bash
pnpm run check
pnpm run build
pnpm exec electron-builder build --publish never --win --x64
```

## License and notices

Echo Infer Desktop is distributed under GPL-3.0. It includes modified GPL-3.0 code from an upstream open-source desktop AI client; attribution, source-availability notes, and change summary are kept in [`NOTICE.md`](NOTICE.md).
