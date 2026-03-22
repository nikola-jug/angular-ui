# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Web client for the BFF architecture. Angular 21 standalone app (no NgModules), signal-based reactivity. Currently a bare scaffold with no routes or business logic.

## Commands

```bash
npm start          # Dev server on http://localhost:4200
npm run build      # Production build → dist/
npm run watch      # Dev build with watch mode
npm test           # Unit tests (Vitest)
```

## Key Patterns

- **Standalone components only** — no NgModules anywhere. Use `bootstrapApplication()` and `provideRouter()` patterns.
- **Signals for state** — use `signal()` / `computed()` rather than `@Input`/`@Output` or BehaviorSubject where possible.
- **Functional providers** — all DI is wired in `app.config.ts` via `provide*()` functions.
- **Strict templates** — `strictTemplates: true` is enabled; all template bindings are fully type-checked.
- **Prettier** — 100-char line width, single quotes. Run before committing.
- **Production bundle budget** — 500 kB warning / 1 MB error on the initial bundle; keep imports lean.
