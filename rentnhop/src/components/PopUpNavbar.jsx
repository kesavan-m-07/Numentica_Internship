import React from "react";
import LoginButton from "./LoginButton";
import Navbar from "./Navbar";
import SocialLinksLoader from "./SocialLinksLoader";
import { appState } from "../Store";


const PopUpNavbar = ({ isMenuOpen, change }) => {
  const user = appState(state=>state.user);
  if (!isMenuOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-30 inset-0 bg-white w-full pl-5 pt-5 font-lufga animate-slideSide">
      <button
        className="block ml-auto mr-5 text-3xl"
        onClick={() => change(false)}
      >
        X
      </button>
     {!user.username ? <LoginButton showOnMobile /> : <button className="w-[70%] py-2 bg-red-400 text-white font-lufga rounded-2xl mx-auto block">Logout</button>}
      <hr className="border border-gray-200 mt-5 " />
      <Navbar showOnMobile flexCol />
      <hr className="border border-gray-200 mt-5" />
      <SocialLinksLoader/>
    </div>
  );
};

export default PopUpNavbar;
