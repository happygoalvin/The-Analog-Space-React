module.exports = {
  content: [
    "./src/App.js",
    "./src/pages/Landing.js",
    "./src/components/Navbar.js",
    "./src/components/Loader.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
