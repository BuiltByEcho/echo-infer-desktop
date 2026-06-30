# Session attachment RAG evaluation

This note describes the optional evaluation harness for long-file and session attachment retrieval behavior in Echo Infer Desktop.

## Fixture repository

The harness expects a sibling fixture repository by default:

```bash
../../echo-infer-session-rag-eval-fixtures
```

Override with `--fixtures-repo` when needed.

## Standalone flow

```bash
pnpm eval:session-rag -- --fixtures-repo ../../echo-infer-session-rag-eval-fixtures
pnpm eval:session-rag -- --case citrine-threshold
```

## Desktop conversation flow

Use the desktop-flow harness when you need to verify renderer config, file upload, session attachment indexing, tool calls, and persisted assistant messages together.

```bash
USE_LOCAL_API=true node ./node_modules/electron-vite/bin/electron-vite.js build --mode development
pnpm eval:session-rag:desktop -- --case long-citrine-threshold --keep-user-data
```

The desktop-flow script copies app configuration into an isolated temporary user data directory and points the session RAG sqlite database at a separate temporary path so eval runs do not mutate the normal user profile.
