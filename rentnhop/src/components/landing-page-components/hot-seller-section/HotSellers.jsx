import React from "react";
import CardsSwiper from "./CardsSwiper";
const HotSellers = () => {
  return (
    <section className="bg-[#F5FAFF] pt-10 font-lufga p-2 ">
      <p className="text-customBlue font-semibold text-center">Our Fleet</p>
      <h2 className="text-3xl w-[90%] mx-auto md:text-5xl font-bold text-center m-3">Explore our most rented bikes in Delhi</h2>
      <CardsSwiper/>
    </section>
  );
};

export default HotSellers;
