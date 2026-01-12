import React from "react";
import { NavLink } from "react-router";

const navItems = [
  { name: "About", linkTo: "about" },
  { name: "Become a Partner", linkTo: "becomeapartner" },
  { name: "Platform Terms", linkTo: "platformterms" },
  { name: "FAQ's", linkTo: "faqs" },
  { name: "Blogs", linkTo: "blogs" },
  { name: "Contact", linkTo: "contact" },
];
const Navbar = ({ showOnMobile = false, flexCol = false }) => {

  const baseLayout = showOnMobile
    ? "flex flex-wrap m-7 md:my-5 md:flex md:block md:w-[90%]"
    : "hidden md:flex md:w-full md:justify-center";
  const direction = flexCol ? "flex-col items-start" : "flex-row items-center";

  return (
    <nav
      className={`${baseLayout} ${direction} justify-between gap-4 mx-4 lg:gap-7 lg:ml-4 font-lufga`}
    >
      {navItems.map((item, i) => (
        <NavLink
          to={item.linkTo}
          key={i}
          className="
            relative
            text-xs
            lg:text-sm
            text-gray-700
            font-medium
            tracking-wide
            transition-all
            duration-200
            pb-1
            hover:text-[#2563ea]
            after:content-['']
            after:absolute
            after:left-0
            after:bottom-0
            after:w-0
            after:h-[2px]
            after:bg-[#2563ea]
            hover:after:w-full
            after:transition-all
            after:duration-300
            cursor-pointer
          "
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
