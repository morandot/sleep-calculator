/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        surface: 'rgba(13, 18, 45, 0.7)',
        fg: '#F1F5F9',
        muted: '#94A3B8',
        accent: '#6366F1',
        accentGlow: 'rgba(99, 102, 241, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
