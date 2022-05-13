import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import ProductProvider from "./context/ProductContext";

function App() {
  return (
    <>
      <ProductProvider />
      <Navbar />
      {/* Render Routes */}
      <Routes>
        {/* Landing Route */}
        <Route path="/" element={<Landing />} />
        {/* Products Route */}
        <Route path="/products" element={<Products />} />
        {/* ContactUs Route */}
        <Route path="/contact-us" element={<ContactUs />} />
        {/* Checkout Route */}
        <Route path="/checkout" element={<Checkout />} />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        {/* Register Route */}
        <Route path="/register" element={<Register />} />
        {/* Profile Route */}
        <Route path="/profile" element={<Profile />} />
        {/* Orders Route */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <ProductProvider />
    </>
  );
}

export default App;
