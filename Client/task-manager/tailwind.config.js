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
        '100': '50rem'
      }
    }
  },
  plugins: [],
};