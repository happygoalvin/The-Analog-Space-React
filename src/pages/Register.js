import React, { useState, useEffect } from "react";
import RegisterImage from "../assets/images/registration-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, apiPath } from "../utils/axios";
import { regex } from "../validators";

export default function Register() {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    contact_number: "",
  });

  const [errorState, setErrorState] = useState({
    errorFirstName: "",
    errorLastName: "",
    errorContactNo: "",
    errorEmail: "",
    errorPassword: "",
    errorConfirmPw: "",
    disable: true,
  });

  const [noFill, setNoFill] = useState({
    error: "",
    display: "hidden",
  });

  useEffect(() => {
    if (registerState.first_name === "") {
      setErrorState({
        errorFirstName: "Field is required",
        disable: true,
      });
    } else {
      setErrorState({
        errorFirstName: "",
        disable: false,
      });
    }
  }, [registerState.first_name]);

  useEffect(() => {
    if (registerState.last_name === "") {
      setErrorState({
        errorLastName: "Field is required",
        disable: true,
      });
    } else {
      setErrorState({
        errorLastName: "",
        disable: false,
      });
    }
  }, [registerState.last_name]);

  useEffect(() => {
    if (registerState.contact_number === "") {
      setErrorState({
        errorContactNo: "Field is required",
        disable: true,
      });
    } else if (registerState.contact_number !== regex.contact) {
      setErrorState({
        errorContactNo: "Please enter a valid contact number",
        disable: true,
      });
    }

    if (registerState.contact_number.match(regex.contact)) {
      setErrorState({
        errorContactNo: "",
        disable: false,
      });
    }
  }, [registerState.contact_number]);

  useEffect(() => {
    if (registerState.email === "") {
      setErrorState({
        errorEmail: "Field is required",
        disable: true,
      });
    } else if (registerState.email !== regex.email) {
      setErrorState({
        errorEmail: "Please enter a valid email address",
        disable: true,
      });
    }

    if (registerState.email.match(regex.email)) {
      setErrorState({
        errorEmail: "",
        disable: false,
      });
    }
  }, [registerState.email]);

  useEffect(() => {
    if (registerState.password === "") {
      setErrorState({
        errorPassword: "Field is required",
        disable: true,
      });
    } else if (registerState.password !== regex.password) {
      setErrorState({
        errorPassword:
          "Min. 8 chars, at least 1 uppercase, one lowercase and one number",
        disable: true,
      });
    }

    if (registerState.password.match(regex.password)) {
      setErrorState({
        errorPassword: "",
        disable: false,
      });
    }
  }, [registerState.password]);

  useEffect(() => {
    if (registerState.confirm_password === "") {
      setErrorState({
        errorConfirmPw: "Field is required",
        disable: true,
      });
    } else if (!registerState.confirm_password.match(registerState.password)) {
      setErrorState({
        errorConfirmPw: "Does not match password",
        disable: true,
      });
    }

    if (registerState.confirm_password === registerState.password) {
      setErrorState({
        errorConfirmPw: "",
        disable: false,
      });
    }
  }, [registerState.confirm_password, registerState.password]);

  const updateFormField = (e) => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    if (
      registerState.first_name === "" &&
      registerState.last_name === "" &&
      registerState.email === "" &&
      registerState.password === "" &&
      registerState.confirm_password === "" &&
      registerState.contact_number === "" &&
      errorState.disable === false
    ) {
      setNoFill({
        error: "Please fill the Registration Form",
        display: "block alert alert-error shadow-lg alert-sm mt-3",
      });
    } else {
      const { confirm_password, ...registerData } = registerState;
      await baseUrl.post(apiPath.register, { ...registerData });
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${RegisterImage})` }}
      >
        {/* Login Form start */}
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start h-full">
            <div className="w-full lg:w-1/2 max-w-sm">
              <div className="bg-zinc-800 px-6 pb-6 pt-3 rounded-lg shadow-lg">
                <div>
                  <h1 className="text-center text-2xl font-bold pt-2">
                    Register
                  </h1>
                </div>
                <div className={noFill.display}>
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
                    <span className="prose font-semibold">{noFill.error}</span>
                  </div>
                </div>
                {/* input start */}
                {/* First Name */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-rose-500">
                    {errorState.errorFirstName}
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={registerState.first_name}
                    onChange={updateFormField}
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Last Name */}
                <div className="form-control w-full max-w-xs mt-3">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-rose-500">
                    {errorState.errorLastName}
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={registerState.last_name}
                    onChange={updateFormField}
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Contact Number */}
                <div className="form-control w-full max-w-xs mt-3">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Contact Number
                    </span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-rose-500">
                    {errorState.errorContactNo}
                  </div>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    name="contact_number"
                    value={registerState.contact_number}
                    onChange={updateFormField}
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Email */}
                <div className="form-control w-full max-w-xs mt-3">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-rose-500">
                    {errorState.errorEmail}
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={registerState.email}
                    onChange={updateFormField}
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Password */}
                <div className="form-control w-full max-w-xs mt-3">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-rose-500">
                    {errorState.errorPassword}
                  </div>
                  <input
                    type="text"
                    placeholder="*****"
                    name="password"
                    value={registerState.password}
                    onChange={updateFormField}
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Confirm Password */}
                <div className="form-control w-full max-w-xs mt-3">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Confirm Password
                    </span>
                  </label>
                  <div className="prose text-sm pb-2 pl-1 text-rose-500">
                    {errorState.errorConfirmPw}
                  </div>
                  <input
                    type="text"
                    placeholder="*****"
                    name="confirm_password"
                    value={registerState.confirm_password}
                    onChange={updateFormField}
                    className="input input-bordered input-secondary w-full max-w-xs bg-zinc-100 caret-secondary mb-1 focus:text-black text-black/70"
                  />
                </div>
                {/* Input form end */}
                {/* Submit */}
                <div className="flex items-center justify-between mt-5">
                  <p className="prose text-sm">
                    Have an account?
                    <Link
                      to="/login"
                      className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-300 underline px-1"
                    >
                      Login
                    </Link>
                  </p>
                  <button
                    onClick={registerUser}
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
