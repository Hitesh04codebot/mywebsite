/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#0F4C81',
        'light-blue': '#EAF4FF',
        'text-dark': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
