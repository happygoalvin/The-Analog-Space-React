module.exports = {
  content: [
    "./src/App.js",
    "./src/pages/Landing.js",
    "./src/components/Navbar.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
