import React, { useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import hamburgerMenu from "/hamburger-menu.svg";
import LocationSelector from "./LocationSelector";
import Cart from "./Cart";
import PopUpNavbar from "./PopUpNavbar";
import LoginButton from "./LoginButton";
import { useLocation } from "react-router";
import ProfileSection from "./ProfileSection";
import { appState } from "../Store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = appState((state) => state.user);
  

  return (
    <>
      <header
        className={` w-full flex items-center p-2 ${
          location.pathname === "/" ? "sticky top-0" : "relative"
        }  bg-white shadow-xl z-30`}
      >
        <button onClick={() => setIsMenuOpen((prev) => !prev)}>
          <img
            src={hamburgerMenu}
            alt="menu icon"
            className="w-7 h-7 md:hidden"
          />
        </button>{" "}
        <div className="flex items-center justify-center gap-13 ">
          <Logo />
          <Navbar />
        </div>
        <div className="flex items-center justify-center md:gap-2 lg:gap-8 ml-auto">
          <LocationSelector />
          <Cart />
          {!user.username ? <LoginButton /> : <ProfileSection username={user.username} />}
        </div>
      </header>
      <PopUpNavbar isMenuOpen={isMenuOpen} change={setIsMenuOpen} />
    </>
  );
};

export default Header;
