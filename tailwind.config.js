module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'dark', 'dark-hover', 'dark-group-hover', 'dark-active', 'dark-even', 'dark-odd'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'dark', 'dark-hover', 'dark-active']
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
}
