# Provider config import manual test cases

Manual test notes for provider config import in Echo Infer Desktop.

## Flow

1. Copy any JSON configuration from this file.
2. Open Echo Infer Desktop → Settings → Providers.
3. Click **Import from Clipboard**.
4. Confirm the import dialog decodes the provider config correctly.

## Deep link smoke

If deep links are enabled for the local build, verify that a provider import link opens Echo Infer Desktop and shows the decoded import dialog.

Expected result:

- The desktop app opens.
- The import dialog shows decoded config.
- Provider IDs remain unique.

Built-in provider IDs may include compatibility IDs for legacy providers; keep public instructions focused on Echo Infer and OpenAI-compatible providers.
