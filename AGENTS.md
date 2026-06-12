# Philosophy Atlas agent guide

## Project summary
Local-first Vite + React + TypeScript educational atlas. It has no backend or external API requirement for v1. All philosophy records live in `src/data` and types live in `src/types`.

## Commands
- `npm run dev` — start the local Vite app.
- `npm run build` — type-check and build production assets.

## Conventions
- Prefer small, readable React function components and plain CSS.
- Keep navigation state local; do not introduce a backend, auth, or network dependency for v1.
- Keep explanations beginner-friendly and relationship-focused.
- Do not invent exact quotes. Mark approximate dates when needed.
- Maintain accessible labels, visible focus states, readable text, and non-color cues.
- Always run `npm run build` before calling a coding task complete when possible.
