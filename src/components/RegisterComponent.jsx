import React from "react";
import { Link } from "react-router-dom";
const RegisterComponent = () => {
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
          <h2 className="text-3xl font-bold text-center text-[#3E2C23] mb-2">Register</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4B350]"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold transition bg-gradient-to-r from-[#e7dccb] via-[#d6c3b1] to-[#e7dccb] hover:cursor-pointer hover:from-[#b8a48a] hover:via-[#d6c3b1] hover:to-[#b8a48a] hover:text-gray-700 shadow"
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
