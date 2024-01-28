/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#319447',
        'main-bg-color': 'rgb(48, 48, 48)',
        'divider-color': 'rgb(73, 73, 73)',
      }
    },
  },
  plugins: [],
}

