# CLAUDE.md

## Project Overview

Sleep Calculator — a science-based sleep cycle calculator that suggests optimal bedtimes
and wake times based on ~90-minute sleep cycles. PWA-ready, i18n (EN/ZH).

## Architecture

### Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| `src/sleep.ts` | Pure functions for sleep cycle math. No side effects. |
| `src/i18n.ts` | Translation strings, language detection, DOM string updates. |
| `src/ui.ts` | UI orchestration: view switching, result rendering, event binding. |
| `src/main.ts` | Entry point: bootstrap i18n, init UI, analytics. |
| `src/style.css` | Tailwind directives + theme CSS variables + custom animations. |

### Key Design Decisions

- **Vanilla TypeScript** — no framework. The app is small enough that DOM APIs suffice.
- **12-hour time format** internally; display-only.
- **CSS Grid stacking** for input/result view transitions (no layout shift).
- **PWA** via `vite-plugin-pwa` + Workbox for offline support.
- **Inter font** loaded from Google Fonts with preconnect.

## Testing Gate

Before implementing any feature or phase, strictly follow:

1. **Write tests first**: Add or update test cases covering the core capability before implementation.
2. **Test-first flow**: Run tests (should fail) → Implement → Run tests again (pass + no regressions).

### Test Framework

- **Vitest** for unit tests.
- Test files: `src/__tests__/<module>.test.ts`
- Run: `npm test`
- Coverage: `npm run test:coverage`

## Code Conventions

### Language

- Code: English (comments, variable names, commit messages)
- UI strings: managed via `src/i18n.ts` (EN + ZH)
- All comments and documentation in English

### Style

- Functions ≤ 50 lines, single responsibility
- Meaningful variable names (no single-letter except loop counters)
- Explicit error handling — never swallow exceptions
- No `@ts-ignore` / `@ts-expect-error` without documented reason
- Prefer `const` over `let`, never `var`

### Naming

- Files: `kebab-case.ts`
- Types/Interfaces: `PascalCase`
- Functions/Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: `kebab-case` (Tailwind utilities exempt)

## Design System

Reference `~/design.md` for all UI decisions. Key rules:

- **Warm tones** — no cold blue-grays
- **Font weights 500-600** for headings — never 700+
- **Serif font** for display/h1-h3 headlines only
- **System sans-serif** for body/UI text
- **Border radius ≥ 6px** for interactive elements
- **No gradient backgrounds**, no pure black/white
- **No decorative animations** (bounce, rotate, pulse)
- **No `!important`**
- **Mobile-first responsive** design

### Tailwind Customization

When extending `tailwind.config.js`, add tokens from `~/design.md` — do not invent new values.

## Dependencies

| Package | Purpose |
|---------|---------|
| vite | Build tool |
| typescript | Type checking |
| tailwindcss | Utility-first CSS |
| autoprefixer | Vendor prefixes |
| postcss | CSS processing |
| vite-plugin-pwa | PWA + Workbox |
| vitest | Unit testing |

## Build & Dev

```bash
npm run dev        # Dev server (Vite)
npm run build      # Type check + production build
npm run preview    # Preview production build
npm test           # Run tests (Vitest)
npm run lint       # ESLint check (flat config, eslint.config.js)
npm run lint:fix   # ESLint auto-fix
npm run format     # Prettier format
npm run format:check # Prettier check (no write)
```

## Compact Instructions

Preserve in priority order:

1. Architecture decisions (NEVER summarize)
2. Modified files and key changes
3. Verification status (pass/fail)
4. Open TODOs and rollback notes
5. Tool outputs (keep pass/fail only)

## Git

- Branch from `main` for features
- Commit messages: `type(scope): description` (e.g. `feat(ui): add theme toggle`)
- Do NOT `git push` or `gh pr create` without asking first
- Local changes only unless explicitly approved
