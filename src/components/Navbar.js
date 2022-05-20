import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";

export default function Navbar() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);

  return (
    <React.Fragment>
      <nav className="navbar bg-base-100 border-b-2 border-amber-500/70">
        <div className="navbar-start lg:ml-24">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost btn-circle lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border-2"
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
          <Link className="btn btn-ghost normal-case text-sm md:text-xl" to="/">
            <img
              src={require("../assets/images/brand-logo2.png")}
              className="w-6 h-6 sm:w-12 sm:h-12 mx-2 btn-circle"
            ></img>
            The Analog Space
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li className="">
              <Link to="/">Home</Link>
            </li>
            <li className="mx-6">
              <Link to="/products">Products</Link>
            </li>
            <li className="">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
        {!userCtx.loggedOut ? (
          <React.Fragment>
            <div className="navbar-end">
              <div className="dropdown font-mono">
                <label tabIndex="0" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {cartCtx.cart ? (
                      <span className="badge badge-sm badge-primary indicator-item">
                        {cartCtx.cart.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </label>

                <div
                  tabIndex="0"
                  className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow border-2"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg font-mono">
                      {cartCtx.cart.length} Items
                    </span>
                    {cartCtx.cart ? (
                      cartCtx?.cart?.map((info) => {
                        return (
                          <React.Fragment key={info.id}>
                            <figure className="max-h-80">
                              <img
                                src={info.camera.image_url}
                                alt={info.camera.name}
                              />
                            </figure>
                            <span className="text-accent">
                              {info.camera.name}
                            </span>
                            <span>Qty: {info.quantity}</span>
                            <p>Subtotal: ${(info.camera.cost * info.quantity) / 100}</p>
                            <button className="btn btn-outline btn-error btn-sm font-normal ">Remove from cart</button>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <p>hello</p>
                    )}
                    <div className="card-actions">
                      <Link
                        className="btn btn-outline btn-primary btn-md btn-block hover:shadow-lg hover:shadow-cyan-500/50 transition hover:ease-in-out duration-300"
                        to="/checkout"
                      >
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end lg:hidden">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <i className="fa-solid fa-circle-user fa-2xl"></i>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border-2"
                >
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        userCtx.logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal mx-4 p-3">
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={() => userCtx.logout()}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="navbar-end">
              <div className="dropdown dropdown-end lg:hidden">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <i className="fa-solid fa-circle-user fa-2xl"></i>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border-2"
                >
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
              <div className="hidden lg:flex">
                <ul className="menu menu-horizontal mx-4 p-3">
                  <li className="mx-4">
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
}
