import React from "react";
import HeroImage from "/heroImage.avif";
import HeroTitle from "./HeroTitle";
import HeroSectionForm from "./HeroSectionForm";
import { appState } from "../../../Store";

const HeroSection = () => {
  const selectedLocation = appState(state=>state.selectedLocation) || '';
  return (
    <div className=' flex flex-col-reverse md:flex-row bg-no-repeat bg-contain bg-[position:0_-100px] md:bg-[url("/heroSectionBackground.png")] md:min-h-[50vh] lg:min-h-[90vh] overflow-hidden font-lufga'>
      <div className="md:w-3/5 ml-3 md:ml-5 lg:ml-10 px-2 pt-5">
        <HeroTitle />
        <p className="md:mt-6 md:text-xl">Bike on rent in <span className="capitalize">{selectedLocation}</span></p>
        <HeroSectionForm />
      </div>
      <img
        src={HeroImage}
        loading="lazy"
        alt="Hero Image"
        className="md:object-cover md:object-top md:w-2/5 lg:w-1/2 md:scale-125 lg:scale-100 -z-1"
      />
    </div>
  );
};

export default HeroSection;
