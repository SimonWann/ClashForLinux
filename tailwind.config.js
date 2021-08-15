module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      normal: '0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.3)',
      normalD: '0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.6)',
      active: '0 0 0.3rem 0.1rem rgba(0, 0, 0, 0.5)',
      activeD: '0 0 0.3rem 0.1rem rgba(0, 0, 0, 0.8)',
      innerNormal: 'inset -0.1rem 0.1rem 0.3rem 0.1rem rgba(0, 0, 0, 0.5)'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
