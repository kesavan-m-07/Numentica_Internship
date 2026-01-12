import React from "react";
import { useNavigate } from "react-router";

const LoginButton = ({ showOnMobile = false }) => {
  const navigate = useNavigate()
  

  const visibilityClass = showOnMobile
    ? "block w-[90%] mx-auto mt-5 md:block"
    : "hidden w-fit md:block";

  return (
    <button
      onClick={() => navigate('/auth/login')}
      className={`${visibilityClass} font-semibold font-lufga text-xs lg:text-sm text-white bg-[#2563ea] py-2 px-3 lg:py-3 lg:px-4 rounded-3xl cursor-pointer`}
    >
      Login/Signup
    </button>
  );
};

export default LoginButton;
