import React from "react";
import ActivaPng from "/activa-5g.webp";

const ServiceBanner = () => {
  return (
    <section className="flex flex-col md:flex-row font-lufga justify-between items-center overflow-hidden mx-2 my-5 py-4 md:py-6 rounded-2xl bg-gradient-to-b from-[#0056F1]/20 to-white/20">
      <img
        src={ActivaPng}
        alt="Bike"
        loading="lazy"
        className="scale-x-[-1] w-4/5 md:w-4/12 -translate-x-10 md:-translate-x-16 mb-4 md:mb-0"
      />

      <div className="flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold">
          Services we Offer
        </h2>
        <p className="text-xs sm:text-base md:text-lg mt-1">
          Daily, Weekly, Fortnight & Monthly Plans for all bikes
        </p>
        <button className="bg-black text-white rounded-3xl px-4 py-2 mt-3 text-sm sm:text-base">
          Rent Now
        </button>
      </div>
      <img
        src={ActivaPng}
        loading="lazy"
        alt="Bike"
        className="w-4/5 md:w-4/12 translate-x-10 md:translate-x-16 mt-4 md:mt-0"
      />
    </section>
  );
};

export default ServiceBanner;
