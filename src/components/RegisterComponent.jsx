import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../utility/validate/registerValidate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const RegisterComponent = () => {
  //   const formik = useFormik({
  //     // in formik we match value from name attribute
  //     initialValues: {
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     },
  //   });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    dirty,
    isValid,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    validateOnChange: true,
    //   validateOnBlur: true,
    onSubmit: async (values, action) => {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      action.resetForm();
    },
  });
  const togglePasswordHandler = (state) => {
    setShowPassword(state);
  };
  const toggleConfirmPasswordHandler = (state) => {
    setShowConfirmPassword(state);
  };

  return (
    <div id="register-component" className="w-full h-full flex">
      <div
        id="left"
        className="w-[50%] px-15 py-25 flex justify-center items-center bg-gradient-to-br from-[#e7dccb] via-[#d6c3b1] to-[#b8a48a]"
      >
        <div
          id="register-container"
          className="w-full max-w-md rounded-xl shadow-lg p-8 flex flex-col gap-6 bg-white/60 backdrop-blur-md"
        >
          <h2 className="text-3xl font-bold text-center text-[#3E2C23] mb-2">
            Register
          </h2>
          <form
            id="register-form"
            className="flex flex-col gap-4"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="FirstName"
              className={`${
                !!values.firstName && errors.firstName
                  ? "ring-2 ring-red-400 focus:bg-red-200"
                  : "focus:ring-2 focus:ring-[#F4B350]"
              } px-4 py-3 rounded-lg border border-gray-300 focus:outline-none`}
              required
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="LastName"
              className={`${
                !!values.lastName && errors.lastName
                  ? "ring-2 ring-red-400 focus:bg-red-200"
                  : "focus:ring-2 focus:ring-[#F4B350]"
              } px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2`}
              required
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className={`${
                !!values.email && errors.email
                  ? "ring-2 ring-red-400 focus:bg-red-200"
                  : "focus:ring-2 focus:ring-[#F4B350]"
              } px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2`}
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
                className={`${
                  !!values.password && errors.password
                    ? "ring-2 ring-red-400 focus:bg-red-200"
                    : "focus:ring-2 focus:ring-[#F4B350]"
                } w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2`}
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
            <div id="password-container" className="relative w-full">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`${
                  !!values.confirmPassword && errors.confirmPassword
                    ? "ring-2 ring-red-400 focus:bg-red-200"
                    : "focus:ring-2 focus:ring-[#F4B350]"
                } w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]`}
                required
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span
                id="toggle-confirm-password"
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => toggleConfirmPasswordHandler(false)}
                    className="text-gray-400 hover:text-gray-800 transition duration-500"
                    sx={{}}
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => toggleConfirmPasswordHandler(true)}
                    className="text-gray-400 hover:text-gray-800 transition duration-500"
                    sx={{}}
                  />
                )}
              </span>
            </div>
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              className={`w-full py-3 rounded-lg  font-semibold   ${
                !(isValid && dirty)
                  ? "bg-[#F5F5F5] text-gray-400 cursor-not-allowed"
                  : "bg-[#d6c3b1] text-gray-600 hover:text-gray-900 hover:cursor-pointer hover:bg-[#b8a48a] transition"
              }  shadow`}
            >
              Register
            </button>
          </form>
          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-[#b8a48a] font-semibold hover:underline"
            >
              Go login
            </Link>
          </div>
        </div>
      </div>
      <div
        id="right"
        className="w-[50%] flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1646399590439-17aef0ed773f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
      ></div>
    </div>
  );
};

export default RegisterComponent;
