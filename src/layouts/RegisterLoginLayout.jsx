import React from 'react'
import { Outlet } from 'react-router-dom'
const RegisterLoginLayout = () => {
  return (
    <div id="register-login-page" className="w-screen h-screen flex justify-center items-center ">
      <Outlet />
    </div>
  )
}

export default RegisterLoginLayout
