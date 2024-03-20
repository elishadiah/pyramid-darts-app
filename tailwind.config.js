/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // enable dark mode
  theme: {
    extend: {
      colors: {
        'main-color': '#319447',
        'main-bg-color': 'rgb(48, 48, 48)',
        'divider-color': 'rgb(73, 73, 73)',
        'form-color': '#2196f3'
      },
      maxHeight: {
        '80-vh': "80vh",
        '75-vh': "75vh",
        '70-vh': "70vh",
        '30-vh': "30vh",
      },
    },
  },
  plugins: [],
}

