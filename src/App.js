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


function App() {
  return (
    <Router>
      <nav class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border-2"
            >
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <Link class="btn btn-ghost normal-case text-xl" to="/">
            The Analog Space
          </Link>
        </div>
        <div class="navbar-end">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabindex="0"
              class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow border-2"
            >
              <div class="card-body">
                <span class="font-bold text-lg">8 Items</span>
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <Link class="btn btn-primary btn-sm btn-block" to="/checkout">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <i class="fa-solid fa-circle-user fa-2xl"></i>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border-2"
            >
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
    </Router>
  );
}

export default App;
