/* eslint-disable no-undef */
const mix = require("laravel-mix");

// Cleans up terminal output
mix.disableNotifications();

mix.webpackConfig({
  watchOptions: {
    ignored: /node_modules|dist|mix-manifest.json/,
  },
});

mix
  .js("src/js/app.js", "dist/js")
  .postCss("src/css/app.pcss", "dist/css", [require("@tailwindcss/postcss")]);
