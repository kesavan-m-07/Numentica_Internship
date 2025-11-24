import React from "react";
import svgIcons from "../../icons/svgIcons";

interface SpecItem {
  label: string;
  value: string;
}

const svgs = [svgIcons.engine(25), svgIcons.seating(25), svgIcons.speed(25), svgIcons.speed(25), svgIcons.speed(25), svgIcons.fuel(25)];

const VehicleSpec = ({ spec }: { spec: string }) => {
  if (!spec) return null;
  
  const parsedSpecs: SpecItem[] = JSON.parse(spec);
  return (
    <>
      <h2 className="m-4 font-semibold text-lg ">Vehicle Spec</h2>
      <div className="flex flex-wrap gap-5 my-5  justify-between mx-5 ">
        {parsedSpecs.map((spec: SpecItem, i: number) => (
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
