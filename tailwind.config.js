/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f0ff',
          100: '#e4deff',
          200: '#cbbdff',
          300: '#a88fff',
          400: '#8156fd',
          500: '#5c22f6',
          600: '#4c10e6',
          700: '#3d08c4',
          800: '#32099e',
          900: '#190191', // Core Primary Brand Color #190191
          950: '#0e0061',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          muted: '#f1f5f9',
          border: '#e2e8f0',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Instrument Serif"', 'Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 1px 3px 0 rgba(25, 1, 145, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        elevated: '0 10px 25px -5px rgba(25, 1, 145, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
