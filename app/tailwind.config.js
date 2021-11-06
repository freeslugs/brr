module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'main': '#4C3A99',
        'red': '#F37168',
        'light-main': '#846EE6',
        'green': '#429942',
        'light-green': '#57E657',
        'orange': '#E6AF85',
        'gray': '#AD9FEA'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
