module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-bg': '#1a1a1a', 
      },
      textColor: {
        'dark-text': '#ffffff',
      },
    },
  },
  plugins: [],
}
