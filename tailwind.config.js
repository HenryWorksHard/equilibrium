/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        paper: '#faf8f5',
        ink: '#1a1a2e',
        graphBlue: '#4a6fa5',
        graphLight: '#c8d4e3',
        wood: '#8b7355',
        brass: '#c9a227',
        cream: '#f5f0e6',
      }
    },
  },
  plugins: [],
}
