module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme]'],
  theme: {
    extend: {
      fontFamily: {
        theme1: ['"Poppins"', 'sans-serif'],
        theme2: ['"Roboto Mono"', 'monospace'],
        theme3: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};



