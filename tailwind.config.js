/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Satoshi', 'sans-serif'],
      },
      backgroundImage: {
        'report-bg': "url('/src/assets/Image/report-bg.png')"
      }
    },
  },
  plugins: [],
}