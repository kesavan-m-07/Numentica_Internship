import React from "react";
import Logo from "../components/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <div className="p-2 shadow-2xl">
        <Logo />
      </div>
      <Outlet />
    </>
  );
};

export default AuthLayout;
