import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import SocialLinksLoader from "./SocialLinksLoader";
import DownloadIcons from "./DownloadIcons";
import CopyRightSection from "./CopyRightSection";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between p-2 md:items-start bg-gray-50">
        <div className="md:w-[30%] w-full flex flex-col">
          <Logo />
          <p className="font-lufga my-3 text-sm leading-relaxed text-gray-700">
            RentnHop is an online Motorcycle Rental Platform incorporated in
            2018. We pride ourselves with a mission of building the world's
            largest Motorcycle Rental Platform. Owned and operated by Avantur
            Technologies Pvt. Ltd, we offer a smarter and organised way of
            renting bikes in India.
          </p>
          <SocialLinksLoader />
        </div>

        <div className="md:w-[60%] w-full flex flex-col md:items-end mt-5 md:mt-0">
          <Navbar showOnMobile />
          <div className="mt-4 md:mt-6 ml-auto">
            <DownloadIcons />
          </div>
          <p className="mt-5 text-sm text-center">
            RentnHop is DPIIT #startupindia Recognised via{" "}
            <span className="underline text-blue-700 cursor-pointer">
              Certificate No. DIPP67514
            </span>
          </p>
        </div>
      </div>
      <CopyRightSection />
    </>
  );
};

export default Footer;
