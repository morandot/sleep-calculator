/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral (warm tones from design.md)
        bg: {
          DEFAULT: '#FDFDFD',
          subtle: '#F5F4ED',
          elevated: '#FFFFFF',
          dark: '#0A0A0A',
          'dark-subtle': '#141413',
          'dark-elevated': '#1C1C1C',
        },
        fg: {
          DEFAULT: '#18181B',
          muted: '#5E5D59',
          dark: '#FAFAFA',
          'dark-muted': '#A0A098',
        },
        border: {
          DEFAULT: '#E8E6DC',
          strong: '#D1CFC5',
          dark: '#3D3D3A',
          'dark-strong': '#4A4A48',
        },
        // Primary (from design.md)
        primary: {
          DEFAULT: '#6C5CE7',
          dark: '#8B7FF0',
        },
        // Accent
        accent: {
          DEFAULT: '#8B5CF6',
          dark: '#A78BFA',
        },
        // Semantic
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        // Ring shadows
        'ring-warm': '#D1CFC5',
        'ring-subtle': '#E0DED4',
        'ring-deep': '#C2C0B6',
      },
      fontFamily: {
        headline: ['Georgia', '"Noto Serif SC"', '"Noto Serif JP"', '"Noto Serif KR"', '"Songti SC"', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', '"Noto Sans SC"', '"Noto Sans JP"', '"Noto Sans KR"', '"Malgun Gothic"', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
}
