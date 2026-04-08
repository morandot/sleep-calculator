# Sleep Calculator

English | [中文](./README.zh-CN.md)

A minimalist, science-based sleep cycle calculator with a deep starry sky aesthetic. It helps you find a better time to wake up or go to bed by aligning with natural ~90-minute sleep cycles.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Vite 5](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Language: TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Style: Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA: Ready](https://img.shields.io/badge/PWA-Ready-0052FF?logo=progressive-web-apps)](https://web.dev/progressive-web-apps/)

**[Live demo](https://sleep.nopress.net)**

---

## Features

- **Sleep science**: Suggests times based on ~90-minute cycles (typically 3 to 6 cycles).
- **Glassmorphism UI**: “Deep starry sky” look with semi-transparent surfaces and indigo accents.
- **Zero-FOUC load**: Inline base styles and a short “ready” phase to reduce white flashes on first paint.
- **Custom i18n**: Switch between **English** and **简体中文** with an animated dropdown—no full page reload.
- **PWA**: Installable on mobile and desktop; offline support via `vite-plugin-pwa` and Workbox.
- **Stable layout**: Input and result views use CSS Grid stacking to avoid jumpy transitions.

## Tech stack

- **Core**: [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (with PostCSS)
- **PWA**: [Workbox](https://developer.chrome.com/docs/workbox/) via [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/)
- **Typography**: Inter (Google Fonts)
- **Icons**: Inline SVGs in markup

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm (or another compatible package manager)

### Commands

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sleep-calculator.git
   cd sleep-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development server**
   ```bash
   npm run dev
   ```

4. **Production build**
   ```bash
   npm run build
   ```

5. **Preview the production build locally**
   ```bash
   npm run preview
   ```

## Project structure

```text
sleep-calculator/
├── src/
│   ├── main.ts       # Entry, gtag bootstrap, hydration
│   ├── ui.ts         # DOM & language dropdown
│   ├── sleep.ts      # Cycle math
│   ├── i18n.ts       # Copy & language state
│   └── style.css     # Tailwind & theme
├── public/
│   ├── icons/        # PWA icons
│   ├── offline.html
│   └── favicon.svg
├── index.html        # Vite entry & anti-flash markup
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts    # PWA & build
```

## Sleep logic

Each cycle is about **90 minutes**. The app suggests waking at the end of a cycle. Common targets:

- **6 cycles**: ~9 hours  
- **5 cycles**: ~7.5 hours  
- **4 cycles**: ~6 hours  
- **3 cycles**: ~4.5 hours  

An extra **~15 minutes** is included as a typical time to fall asleep.

## Analytics

The template ships with Google Analytics (`gtag`). To use your own measurement ID, replace `G-V4MRZL3F6K` in **`index.html`** (script URL) and **`src/main.ts`** (`gtag('config', …)`).

## License

[MIT License](https://opensource.org/licenses/MIT).