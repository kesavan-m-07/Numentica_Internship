import React from "react";
import LoginButton from "./LoginButton";
import Navbar from "./Navbar";
import SocialLinksLoader from "./SocialLinksLoader";
import Loader from '../dumb-components/Loader'
import { useLogout } from "../query/useLogout";
import { useAuth } from "../hooks/useAuth";

const MobileNavbar = ({ isMenuOpen, change }: { isMenuOpen: boolean; change: (open: boolean) => void }) => {
  const {isAuthenticated} = useAuth()
  const {mutate:logout,isPending} = useLogout();

  if (!isMenuOpen) return null;
  if(isPending) <Loader />

  return (
    <div className="fixed top-0 left-0 z-30 inset-0 bg-white w-full pl-5 pt-5  animate-slideSide">
      <button
        className="block ml-auto mr-5 text-3xl"
        onClick={() => change(false)}
      >
        X
      </button>
     {!isAuthenticated ? <LoginButton showOnMobile /> : <button onClick={() => logout()} className="w-[70%] py-2 bg-red-400 text-white  rounded-2xl mx-auto block">Logout</button>}
      <hr className="border border-gray-200 mt-5 " />
      <Navbar showOnMobile flexCol />
      <hr className="border border-gray-200 mt-5" />
      <SocialLinksLoader/>
    </div>
  );
};

export default MobileNavbar;
