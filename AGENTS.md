# Project Agent Rules

## Token Budget

- Keep context small for simple tasks.
- Read only files directly needed for the requested change.
- Do not load `references/`, `rules/`, large READMEs, or broad docs unless the task clearly needs them.
- Prefer targeted `rg` searches over broad exploration.

## Verification

- Do not run builds, type checks, Biome, lint, or global test suites unless the user explicitly asks.
- For small edits, verify with targeted file reads or narrow searches.

## Skills

- Use local skills only when the user asks for them, the target file requires them, or the task touches critical domain rules.
- Do not use generic framework skills for small text, class, label, import, or one-file edits.
- If a skill is needed, load only that skill and avoid its optional references unless necessary.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
