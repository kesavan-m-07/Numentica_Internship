import React from "react";
import { appState } from "../../../Store";

const availableLocation = [
 { value: "chennai", label: "Chennai" },
 { value: "bangalore", label: "Bangalore" },
 { value: "hyderabad", label: "Hyderabad" },
 { value: "trichy", label: "Trichy" },
 { value: "delhi", label: "Delhi" },
 { value: "coimbatore", label: "Coimbatore" },
 { value: "thanjavur", label: "Thanjavur" },
];
const TopCities = () => {
  const updateLocation = appState((state) => state.updateLocation);

  const handleClick = (city) => {
    updateLocation(city);
    window.scrollTo({top:0,behavior:'smooth'})
  };

  return (
    <section className="font-lufga my-10 px-4 md:px-10">
      <p className="text-customBlue text-center font-semibold tracking-wide">
        Top Indian Cities
      </p>
      <h2 className="text-3xl md:text-5xl text-center font-bold mt-2 mb-8">
        We are available in these popular cities
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {availableLocation.map((city) => (
          <div
            key={city.value}
            onClick={() => handleClick(city.value)}
            className="w-full max-w-[180px] bg-white shadow-[0_0_10px_rgba(0,0,0,.15)] p-3 rounded-2xl hover:bg-customBlue hover:text-white transition duration-300 cursor-pointer text-center"
          >
            <img
              src={city.src}
              alt={`${city.label} city`}
              className="w-full h-28 object-cover rounded-xl"
              loading="lazy"
            />
            <p className="mt-4 font-semibold text-sm md:text-base">
              {city.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCities;
