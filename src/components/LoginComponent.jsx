import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../utility/context/authContext";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordHandler = (state) => {
    setShowPassword(state);
  };
  const { login, isLoading } = useAuth();
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, action) => {
      try {
        console.log("Login values: ", values);
        await login(values);
        action.resetForm();
      } catch (err) {
        console.error("Login error: ", err.response?.data || err.message);
      }
    },
  });
  return (
    <>
      {!isLoading && (
        <div id="login-component" className="w-full h-full flex">
          <div
            id="left"
            className="hidden md:block md:w-[50%] 2xl:w-[60%] bg-gray-500 flex justify-center items-center md:bg-[url('https://images.unsplash.com/photo-1646399590439-17aef0ed773f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] md:bg-cover"
          ></div>
          <div
            id="right"
            className="w-[100%] md:w-[50%] 2xl:w-[30%]px-15 py-25 flex justify-center items-center md:bg-gradient-to-br md:from-[#e7dccb] md:via-[#d6c3b1] md:to-[#b8a48a] bg-[url('https://images.unsplash.com/photo-1646399590439-17aef0ed773f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover"
          >
            <div
              id="login-container"
              className="w-[80%] sm:w-full md:mx-10 rounded-xl shadow-lg p-8 sm:mx-20 flex flex-col gap-6 bg-white/60 backdrop-blur-md"
            >
              <h2 className="text-3xl font-bold text-center text-[#3E2C23] mb-2">Sign In</h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="on">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  className="px-4 py-3 rounded-lg border border-gray-600 md:border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
                  required
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div id="password-container" className="relative w-full">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 md:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
                    required
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <span id="toggle-password" className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer">
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
                  disabled={!(!!values.username && !!values.password)}
                  className={`${
                    !(!!values.username && !!values.password)
                      ? "bg-[#F5F5F5] text-gray-400 cursor-not-allowed"
                      : "bg-[#d6c3b1] text-gray-600 hover:text-gray-900 hover:cursor-pointer hover:bg-[#b8a48a] transition"
                  } w-full py-3 rounded-lg  font-semibold shadow`}
                >
                  Login
                </button>
              </form>
              <div className="text-center mt-6 text-sm text-gray-600 flex gap-2 justify-center items-center">
                No account?
                <Link to="/register" className="ml-1 text-[#b8a48a] font-semibold hover:underline">
                  Go register 
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginComponent;
