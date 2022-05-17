import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'simple-notify/dist/simple-notify.es'
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import React from "react";

function App() {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <Navbar />
              {/* Render Routes */}
              <Routes>
                {/* Landing Route */}
                <Route path="/" element={<Landing />} />
                {/* Products Route */}
                <Route path="/products" element={<Products />} />
                {/* View Product Details Route */}
                <Route
                  path="/products/:camera_id"
                  element={<ProductDetails />}
                />
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
            </Router>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
