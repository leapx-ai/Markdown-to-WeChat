# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Markdown-to-WeChat is a Vue 3 SPA that converts Markdown into inline-styled HTML for pasting into WeChat Official Account (微信公众号) editor. The WeChat editor strips external CSS, so all styles must be inline — this is the core constraint driving the architecture.

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Pinia for state management
- CodeMirror 6 for the Markdown editor
- Tailwind CSS v4 with custom `@theme` directives
- Vite (build output goes to `docs/` for GitHub Pages)
- TypeScript via `vue-tsc`

## Common Commands

```bash
# Development server
npm run dev

# Production build (type-check + vite build)
npm run build

# Type check only
npm run type-check

# Lint and auto-fix (runs oxlint + eslint sequentially)
npm run lint

# Format with Prettier
npm run format
```

There are no tests in this project.

## Architecture

### Custom Markdown Renderer

The most important file is `src/utils/markdownRenderer.ts`. This is a **hand-written Markdown parser** (not using marked or similar) that produces HTML with **inline `style` attributes only**. This is required because the WeChat editor discards class names and external stylesheets.

Key behaviors of the renderer:
- Links are converted to superscript footnote references; a "参考链接" section is appended at the end with the actual URLs.
- Code blocks get manual regex-based syntax highlighting using language-specific keyword lists.
- Images are wrapped in `<figure>` with optional `<figcaption>`.
- Tables, headings (H1–H4), blockquotes, lists, task lists, and horizontal rules are all supported.
- An optional appendix can be appended for "follow" CTA and "read more" link (configured in settings).

### State Management (Pinia)

- `editorStore` — Markdown content (persisted to `localStorage` via `@vueuse/core`), save state label, and CodeMirror view reference.
- `themeStore` — Active theme and code theme (persisted). Supports built-in themes plus a user-defined "custom" theme. The `night` theme is the only dark canvas theme.
- `settingsStore` — Preview zoom level and WeChat appendix elements (follow/read-more).
- `uiStore` — Modal states, toast notifications, settings panel visibility.

### Theme System

Themes are defined in `src/config/themes.ts`. Each theme has a `base` object with colors, fonts, and mode flags:

- `h1Mode`: `'underline' | 'center' | 'panel' | 'plain'`
- `headingMode`: `'bar' | 'chip' | 'plain'`
- `quoteMode`: `'bar' | 'panel' | 'soft'`

Code themes (`codeThemes`) define syntax highlighting palettes. The custom theme editor (`ThemeEditorModal.vue`) lets users tweak accent color, font size, line height, and content width.

### Warning / Preflight System

`src/composables/useMarkdownWarnings.ts` analyzes the current Markdown and produces warnings (danger / warn / info) for common WeChat compatibility issues: local images, empty links, unclosed code fences, multiple H1s, deep headings, external links, many tables, long lines, long code blocks, and low heading density.

Blocking warnings (level `danger`) prevent one-click copy; the preflight modal opens instead.

### Smart Format

`src/composables/useSmartFormat.ts` applies CJK typography fixes on first paste: adds spaces between CJK and Latin/number characters, replaces `--` with em-dash, `...` with ellipsis, normalizes heading/list spacing, and collapses excessive blank lines.

### Clipboard & Export

`useClipboard` copies the rendered HTML (wrapped in a full HTML document) as `text/html` plus a plain-text fallback. `useExport` triggers a file download of the same HTML.

## Styling Conventions

- The app UI uses Tailwind CSS v4 utility classes. Custom design tokens are defined in `src/styles/main.css` under `@theme`.
- Dark mode is toggled via the `.dark` class on `<html>`; the preview canvas dark theme is the `night` theme (not Tailwind dark mode).
- The rendered preview HTML uses **inline styles only** — never add class names to the output of `renderMarkdown`.
- The app uses a consistent button style: `bg-[#18181b] text-white border border-[#18181b]` for primary actions, `bg-surface text-text border border-border` for secondary actions.

## File Aliases

`@/` maps to `./src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

## Important Notes

- `vite.config.ts` sets `base: './'` and `outDir: 'docs'` so the build works on GitHub Pages.
- `tsconfig.app.json` has `noUncheckedIndexedAccess: true` enabled for extra safety.
- The project does not use a traditional Markdown parser library; changes to Markdown support must be made in `src/utils/markdownRenderer.ts`.
- All `localStorage` keys are prefixed with `wechat-md-`.
