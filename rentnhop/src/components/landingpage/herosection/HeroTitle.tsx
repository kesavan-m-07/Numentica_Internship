import React, { useEffect, useState } from "react";

const wordsToChange = ["Rent", "Ride", "Repeat"];
const HeroTitle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === wordsToChange.length - 1 ? 0 : prev + 1
        );
        setIsFading(false); 
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5  text-left md:w-2/3 lg:w-full ">
      <h1 className="text-2xl md:text-5xl font-bold  mb-1">
        Explore with Rentnhop
      </h1>
      <h2
        className={`text-2xl md:text-5xl font-semibold  text-[#2563ea] 
          transition-all duration-500 ease-in-out 
          ${isFading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
        `}
      >
        {wordsToChange[currentIndex]}
      </h2>
    </div>
  );
};

export default HeroTitle;
