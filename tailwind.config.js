/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          poker: {
            bg: '#111622',
            felt: '#1e222b',
            cardSpades: '#1f2937',
            cardHearts: '#dc2626',
            cardDiamonds: '#2563eb',
            cardClubs: '#16a34a',
          }
        }
      },
    },
    plugins: [],
  }