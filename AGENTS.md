# Repository Guidelines

## Project Structure & Module Organization

This repository creates a Vietnamese portrait video about financial liquidity. `remotion.md` is the source script; preserve its content when editing presentation code. `src/index.ts` registers `src/Root.tsx`, which defines the `FinancialLiquidity` composition. `src/MainVideo.tsx` coordinates scenes, captions, fonts, and audio. Keep individual scenes in `src/scenes/` and shared animation or UI in `src/components/`. Centralize editable copy, colors, assets, and timing in `src/config.ts`. Put optional audio in `public/audio/`; generated media belongs in ignored `out/`.

## Build, Test, and Development Commands

Use Node.js 22 or newer. Run `npm ci` with the committed lockfile, or `npm install` when intentionally changing dependencies.

- `npm run dev`: open Remotion Studio for timeline and props editing.
- `npm run typecheck`: check all TypeScript without emitting files.
- `npm run still`: render a representative frame to `out/preview.png`.
- `npm run render`: produce the 60-second H.264 video.

Keep `remotion` and `@remotion/cli` on the same exact version.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, single quotes, and semicolons. Use PascalCase for React components and component filenames, camelCase for values, and uppercase constants for shared timeline configuration. Prefer typed function components and inline React styles. No linter or formatter is currently configured. Use `useCurrentFrame()`, `interpolate()`, and `spring()` for deterministic animation; avoid timers, unseeded randomness, and CSS transitions.

## Testing Guidelines

There is no automated test framework or coverage threshold. Run type checking and inspect representative frames, scene boundaries, Vietnamese diacritics, caption wrapping, and the final frame. Confirm 1080 × 1920, 30 fps, and 1,800 frames. If audio changes, verify synchronization and music fades in the rendered video.

## Commit & Pull Request Guidelines

No Git history was present when this guide was written. Use concise imperative commit subjects, such as `Add emergency fund scene`. Pull requests should explain the visible change, reference related issues, report validation, and include preview frames for visual changes. Call out edits to script wording, timings, or required assets.
