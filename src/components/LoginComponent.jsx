import React from "react";
import { Link } from "react-router-dom";
const LoginComponent = () => {
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
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold transition bg-gradient-to-r from-[#e7dccb] via-[#d6c3b1] to-[#e7dccb] hover:cursor-pointer hover:from-[#b8a48a] hover:via-[#d6c3b1] hover:to-[#b8a48a] hover:text-gray-700 shadow"
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
