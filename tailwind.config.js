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
        'form-color': '#2196f3',
        'light-card-start': "#0c0c0c",
        'light-card-end': "#0f971c",
        'dark-card-start': "#0e1c26",
        'dark-card-end': "#000000",
      },
      maxWidth: {
        "32p": "32%",
        "48p": "48%",
      },
      width: {
        "32p": "32%",
        "48p": "48%",
      },
      maxHeight: {
        '80-vh': "80vh",
        '75-vh': "75vh",
        '70-vh': "70vh",
        '65-vh': "65vh",
        '64-vh': "64vh",
        '63-vh': "63vh",
        '62-vh': "62vh",
        '61-vh': "61vh",
        '60-vh': "60vh",
        '30-vh': "30vh",
        'achievement-card': '290px'
      },
      animation: {
        shine: "shine 1s",
        'glow': 'glow 2s infinite'
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px 0 #FEF08A" },
          "50%": { boxShadow: "0 0 20px 10px #FEFCE8" },
        },
      },
    },
  },
  plugins: [],
}

