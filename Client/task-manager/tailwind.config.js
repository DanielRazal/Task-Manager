/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      spacing: {
        '120': '30rem',
        '180': '36rem'
      }
    }
  },
  plugins: [],
};