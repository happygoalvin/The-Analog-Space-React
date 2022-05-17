import React, { useEffect, useState, useContext } from "react";
import LoginImage from "../assets/images/login-bg.jpg";
import { baseUrl, apiPath } from "../utils/axios";
import { regex } from "../validators";
import { useNavigate, Link } from "react-router-dom";
import Notify from "simple-notify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState({
    errorMessageEmail: null,
    errorMessagePassword: "",
    disable: false,
  });
  const [invalid, setInvalid] = useState({
    error: "",
    display: "hidden",
  });

  useEffect(() => {
    if (email === "") {
      setErrorState({
        errorMessageEmail: "Email is required",
        disable: true,
      });
    } else if (email !== regex.email) {
      setErrorState({
        errorMessageEmail: "Must contain a valid email address",
        disable: true,
      });
    }

    if (email.match(regex.email)) {
      setErrorState({
        errorMessageEmail: "",
        disable: false,
      });
    }
  }, [email]);

  useEffect(() => {
    if (password.match(regex.password)) {
      setErrorState({
        errorMessagePassword: "",
        disable: false,
      });
    } else if (password === "") {
      setErrorState({
        errorMessagePassword: "Password is required",
        disable: true,
      });
    } else if (password !== regex.password) {
      setErrorState({
        errorMessagePassword:
          "Min. 8 chars, at least 1 uppercase, one lowercase and one number",
        disable: true,
      });
    }
  }, [password]);

  const loginUser = async () => {
    if (email === "" || password === "") {
      setInvalid({
        error: "Invalid email or password",
        display: "block alert alert-error shadow-lg alert-sm mt-3",
      });
    } else {
      let response = await baseUrl.post(apiPath.login, {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      new Notify({
        status: "success",
        text: "Login success!",
        autoclose: true,
        autotimeout: 1500,
      });
      setTimeout(navigate("/profile"), 1500);
    }
  };

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
                <div className={invalid.display}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="prose font-semibold">{invalid.error}</span>
                  </div>
                </div>
                {/* input start */}
                {/* email */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-semibold pt-1">Email</span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-sky-500">
                    {errorState.errorMessageEmail}
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // validateEmail();
                    }}
                    placeholder="Email"
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Password*/}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-semibold pt-1">
                      Password
                    </span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-sky-500">
                    {errorState.errorMessagePassword}
                  </div>
                  <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*****"
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary focus:text-black text-black/70"
                  />
                </div>
                {/* Input form end */}
                {/* Submit */}
                <div className="flex items-center justify-between mt-5">
                  <p className="prose text-sm">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-300 underline px-1"
                    >
                      Register
                    </Link>
                  </p>
                  <button
                    onClick={loginUser}
                    disabled={errorState.disable}
                    className="btn btn-primary hover:shadow-xl hover:shadow-cyan-400/60 transition hover:ease-in-out duration-500 hover:scale-110 hover:translate-y-1 mr-3 disabled:bg-primary/50 disabled:text-white/50"
                  >
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
