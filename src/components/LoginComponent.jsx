import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordHandler = (state) => {
    setShowPassword(state);
  };
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div id="login-component" className="w-full h-full flex">
      <div
        id="left"
        className="w-[50%] bg-gray-500 flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1646399590439-17aef0ed773f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
      ></div>
      <div
        id="right"
        className="w-[50%] px-15 py-25 flex justify-center items-center bg-gradient-to-br from-[#e7dccb] via-[#d6c3b1] to-[#b8a48a]"
      >
        <div
          id="login-container"
          className="w-full max-w-md rounded-xl shadow-lg p-8 flex flex-col gap-6 bg-white/60 backdrop-blur-md"
        >
          <h2 className="text-3xl font-bold text-center text-[#3E2C23] mb-2">
            Sign In
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
              required
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div id="password-container" className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
                required
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span
                id="toggle-password"
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
              >
                {showPassword ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => togglePasswordHandler(false)}
                    className="text-gray-400 hover:text-gray-800 transition duration-500"
                    sx={{}}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => togglePasswordHandler(true)}
                    className="text-gray-400 hover:text-gray-800 transition duration-500"
                    sx={{}}
                  />
                )}
              </span>
            </div>

            <button
              type="submit"
              disabled={!!values.email && !!values.password}
              className={`${
                !(!!values.email && !!values.password)
                  ? "bg-[#F5F5F5] text-gray-400 cursor-not-allowed"
                  : "bg-[#d6c3b1] text-gray-600 hover:text-gray-900 hover:cursor-pointer hover:bg-[#b8a48a] transition"
              } w-full py-3 rounded-lg  font-semibold shadow`}
            >
              Login
            </button>
          </form>

          <button
            type="button"
            className="w-full py-3 rounded-lg flex items-center justify-center gap-3 bg-white border border-gray-300 shadow hover:bg-gray-300 transition hover:cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>
          <div className="text-center mt-6 text-sm text-gray-600 flex gap-2 justify-center items-center">
            No account?
            <Link
              to="/register"
              className="ml-1 text-[#b8a48a] font-semibold hover:underline"
            >
              Go register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
