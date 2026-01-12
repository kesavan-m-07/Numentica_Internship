import React from "react";
import { BikeInstance, Bike } from "../../types";

interface ProductDetailsProps {
  vehicle: BikeInstance;
  vehicleInfo: Bike;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ vehicle, vehicleInfo }) => {
  if (!vehicle || !vehicleInfo) return null;

  return (
    <div className="space-y-2 p-2  ">
      <h2 className="inline text-customBlue text-3xl font-semibold">
        {vehicleInfo.label}
      </h2>
      <span className="ml-4 text-gray-500">{vehicleInfo.maker}</span>
      <p className="text-sm text-gray-500 my-2">{`⭐ ${vehicle.rating} | ${vehicle.trips} trips`}</p>
      {JSON.parse(vehicle.tags || "[]").map((tag: string, i: number) => (
        <span
          key={i}
          className="bg-[#cdeecf] text-[#2ea84e] font-bold px-2 m-1 text-[9px] rounded-full w-fit"
        >
          {tag}
        </span>
      ))}
      <img
        src={`/${vehicle.bike_slug}.webp`}
        alt="ImagePath"
        className="w-[90%] my-4"
      />
      <p className="text-xs text-center mt-3 text-gray-500">
        *Images are for representation purposes only.
      </p>
    </div>
  );
};

export default ProductDetails;
