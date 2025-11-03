import React from "react";
import svgIcons from "../../svg-icons/svgIcons";


const svgs = [svgIcons.engine(25),svgIcons.seating(25),svgIcons.speed(25),svgIcons.speed(25),svgIcons.speed(25) ,svgIcons.fuel(25)];

const VehicleSpec = ({ spec }) => {
  if(!spec)return null;
  
  const parsedSpecs = JSON.parse(spec);
  return (
    <>
    <h2 className="m-4 font-semibold text-lg font-lufga">Vehicle Spec</h2>
      <div className="flex flex-wrap gap-5 my-5 font-lufga justify-between mx-5 ">
        {parsedSpecs.map((spec, i) => (
          <div
            key={i}
            className="text-customBlue flex flex-col justify-center items-center bg-gradient-to-b from-[#0056F1]/20 to-white/0 p-3 w-30 rounded-2xl"
          >
            {svgs[i]}
            <p className="text-xs text-gray-400">{spec.label}</p>
            <p className="text-gray-600 font-semibold text-lg w-full truncate text-center" title={spec.value}>{spec.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default VehicleSpec;
