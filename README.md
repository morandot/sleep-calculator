# Sleep Calculator

English | [中文](./README.zh-CN.md)

A science-based sleep cycle calculator that suggests optimal bedtimes and wake times
by aligning with natural ~90-minute sleep cycles. Features a warm, distraction-free
interface designed for nighttime use.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Vite 5](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Language: TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Style: Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA: Ready](https://img.shields.io/badge/PWA-Ready-0052FF?logo=progressive-web-apps)](https://web.dev/progressive-web-apps/)

**[Live demo](https://sleep.nopress.net)**

---

## Features

- **Sleep science**: Suggests times based on ~90-minute cycles (typically 3 to 6 cycles).
- **Dark / Light theme**: Warm-toned design system with automatic OS preference detection.
- **Responsive**: Mobile-first layout that works on phones, tablets, and desktops.
- **i18n**: English and 简体中文 with instant switching — no page reload.
- **PWA**: Installable on mobile and desktop; offline support via Workbox.
- **Accessible**: Proper ARIA labels, keyboard navigation, semantic HTML.
- **Zero dependencies runtime**: Pure TypeScript with no framework — fast and lightweight.

## Tech stack

- **Core**: [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with CSS custom properties for theming
- **PWA**: [Workbox](https://developer.chrome.com/docs/workbox/) via [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Typography**: Georgia (headlines), system sans-serif (body)

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm (or another compatible package manager)

### Commands

```bash
# Clone
git clone https://github.com/your-username/sleep-calculator.git
cd sleep-calculator

# Install
npm install

# Development
npm run dev

# Run tests
npm test

# Production build
npm run build

# Preview production build
npm run preview
```

## Project structure

```text
sleep-calculator/
├── src/
│   ├── main.ts        # Entry point: theme init, i18n bootstrap
│   ├── app.ts         # UI orchestration: events, rendering, view switching
│   ├── sleep.ts       # Pure sleep cycle math functions
│   ├── i18n.ts        # Translation strings and language management
│   ├── state.ts       # Simple reactive state (view, theme, language)
│   ├── types.ts       # Shared TypeScript types
│   ├── style.css      # Tailwind directives + theme variables + component styles
│   └── __tests__/
│       ├── sleep.test.ts   # Sleep calculation tests
│       └── i18n.test.ts    # Internationalization tests
├── public/
│   ├── icons/         # PWA icons
│   ├── offline.html   # Offline fallback page
│   └── favicon.svg
├── index.html         # Vite entry with semantic markup and data-i18n attributes
├── CLAUDE.md          # Project conventions and architecture decisions
├── tailwind.config.js # Design tokens from design system
├── postcss.config.js
└── vite.config.ts     # Vite + PWA + Vitest configuration
```

## Sleep logic

Each cycle is about **90 minutes**. The app suggests waking at the end of a cycle.
An extra **~15 minutes** is included as a typical time to fall asleep.

- **6 cycles**: ~9 hours
- **5 cycles**: ~7.5 hours
- **4 cycles**: ~6 hours
- **3 cycles**: ~4.5 hours

## Design system

The UI follows a warm, distraction-free design philosophy:

- **Warm neutral tones** — no cold blue-grays
- **Serif headlines** (Georgia) with 500-600 weight — body uses system sans-serif
- **Border radius ≥ 6px** for all interactive elements
- **No gradient backgrounds**, no pure black/white, no decorative animations
- **CSS custom properties** for seamless light/dark theme switching

See `~/design.md` for the complete design token reference.

## License

[MIT License](https://opensource.org/licenses/MIT).
