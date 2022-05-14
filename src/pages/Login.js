import React from "react";
import LoginImage from "../assets/images/login-bg.jpg";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <React.Fragment>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        {/* Login Form start */}
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start h-full">
            <div className="w-full lg:w-1/2 max-w-sm">
              <div className="bg-zinc-800 px-6 pb-6 pt-3 rounded-lg shadow-lg">
                <div>
                  <h1 className="text-center text-2xl font-bold pt-2">Login</h1>
                </div>
                {/* input start */}
                {/* email */}
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    class="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary"
                  />
                </div>
                {/* Password*/}
                <div class="form-control w-full max-w-xs mt-3">
                  <label class="label">
                    <span class="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="*****"
                    class="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary"
                  />
                </div>
                {/* Input form end */}
                {/* Submit */}
                <div className="flex items-center justify-between mt-5">
                  <Link
                    to="/register"
                    className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-300"
                  >
                    Don't have an account?
                    <span className="underline px-1">Register</span>
                  </Link>
                  <button className="btn btn-primary hover:shadow-xl hover:shadow-cyan-400/60 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1">
                    Login
                  </button>
                </div>
                {/* Submit End */}
              </div>
            </div>
          </div>
        </div>
        {/* Login Form end */}
      </div>
    </React.Fragment>
  );
}
