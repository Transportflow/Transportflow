const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.svelte',
    './node_modules/tailwindcss-dark-mode/prefers-dark.js',
  ],

  whitelistPatterns: [/svelte-/],
  whitelist: ['mode-dark'],

  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const production = !process.env.ROLLUP_WATCH

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
  ]
};
