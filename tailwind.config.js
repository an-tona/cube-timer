/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-code-pro': ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        orange: {
          500: '#f97316',
        },
        green: {
          500: '#22c55e',
        },
        red: {
          500: '#ef4444',
        },
        blue: {
          500: '#3b82f6',
        },
        yellow: {
          500: '#ffff00',
        },
        white: '#ffffff',
        black: '#000000'
      },
    },
  },
  plugins: [],
}