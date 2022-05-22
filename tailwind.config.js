module.exports = {
  content: [
    "./src/App.js",
    "./src/pages/Landing.js",
    "./src/pages/Login.js",
    "./src/pages/Register.js",
    "./src/pages/Products.js",
    "./src/pages/ProductDetails.js",
    "./src/pages/Checkout.js",
    "./src/pages/OrderDetails.js",
    "./src/components/Navbar.js",
    "./src/components/Order.js",
    "./src/components/Loader.js",
    "./src/components/Footer.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
