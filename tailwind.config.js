/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Computer Modern', 'Georgia', 'serif'],
      },
      colors: {
        chalk: '#e8e6e3',
        slate: '#1a1a2e',
        accent: '#4a90a4',
      }
    },
  },
  plugins: [],
}
