import React, { useState } from "react";
import Counter from "./Counter";
import PriceBreakup from "../product-details-page.jsx/PriceBreakup";
import {
  databaseId,
  databases,
  citybikeInfo,
} from "../../app-write-files/AppWriteAccount";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import { useUpdateCart } from "../../custom-hooks/userCarVehiclesUpdate";

const getLabel = (name) => {
  if (!name) return "";
  return name
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
};

const CartItemInfo = ({ vehicle }) => {
  const [isBreakupOpen, setIsBreakUpOpen] = useState(false);
  if (!vehicle) return null;
  const { mutate: updateCart } = useUpdateCart();
  const { data: allAvailablevehicle } = useQuery({
    queryKey: [vehicle.areaSlug, vehicle.bikeSlug],
    queryFn: async () => {
      const res = await databases.listRows({
        databaseId,
        tableId: citybikeInfo,
        queries: [
          Query.equal("area_slug", vehicle.areaSlug),
          Query.equal("bike_slug", vehicle.bikeSlug),
          Query.equal("status", "available"),
        ],
      });

      return res.rows;
    },
    enabled: Boolean(vehicle?.areaSlug && vehicle?.bikeSlug),
    staleTime: 1000 * 60 * 5,
  });

  const availableCount = allAvailablevehicle?.length ?? 0;

  const tripDetails = [
    "Original DL must be shown at pickup.",
    "One original ID proof will be submitted at pickup.",
    `${vehicle.tripLimit || 0} Free Kms, Fuel Excluded.`,
    "Extra Kms at ₹5/Km.",
    `₹ ${
      vehicle.securityDeposit || 0
    } deposit will be refunded within 2 days after drop-off.`,
  ];

  const handleVehicleIncrement = () => {
    return updateCart({ updatedVehicle: vehicle, isIncrement: true });
  };
  const handleVehicleDecrement = () =>
    updateCart({ updatedVehicle: vehicle, isIncrement: false });

  return (
    <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] p-2 my-4 rounded-3xl">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <img
            src={`/${vehicle.bikeSlug}.webp`}
            alt={vehicle.bikeSlug || "CartVehicle"}
            className="rounded-xl w-full h-48 object-contain"
          />

          <div className="flex justify-between items-center bg-white p-4 rounded-2xl mt-2">
            <p className="font-semibold">
              <span className="block text-xs text-gray-500 font-normal">
                Pickup Date
              </span>
              {vehicle.pickupDate?.[0]} {vehicle.pickupDate?.[1]}
              <span className="block text-sm font-normal ml-1">
                {vehicle.pickupDate?.[2]}
              </span>
            </p>

            <p className="text-customBlue font-semibold text-xs lg:text-base">
              {vehicle.duration?.days ?? 0} days, {vehicle.duration?.hours ?? 0}{" "}
              hrs
            </p>

            <p className="font-semibold">
              <span className="block text-xs text-gray-500 font-normal">
                Return Date
              </span>
              {vehicle.returnDate?.[0]} {vehicle.returnDate?.[1]}
              <span className="block text-sm font-normal ml-1">
                {vehicle.returnDate?.[2]}
              </span>
            </p>
          </div>
        </div>

        <div className="basis-[45%] mt-4 md:mt-0 md:pl-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">
                {getLabel(vehicle?.bikeSlug)}
              </h3>
              <p className="font-semibold">
                {getLabel(vehicle?.areaSlug)}{" "}
                <span
                  className={`block font-normal text-xs bg-gray-300 max-w-fit px-2 rounded-2xl my-1 py-1 ${
                    availableCount <= 2
                      ? "text-red-500"
                      : availableCount <= 4
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {availableCount} Left
                </span>
              </p>
              <p className="underline underline-offset-3 text-xs text-gray-400 my-2">
                About the location
              </p>
            </div>

            <Counter
              handleVehicleDecrement={handleVehicleDecrement}
              handleVehicleIncrement={handleVehicleIncrement}
              price={vehicle.price}
              vehicleInfo={{
                vehicleLeft: availableCount,
                vehicleCount: vehicle.quantity ?? 1,
              }}
            />
          </div>

          <h4 className="font-semibold mt-3">Your Trip Includes</h4>
          <ul className="list-disc ml-5 space-y-1 my-2">
            {tripDetails.map((detail, i) => (
              <li className="text-gray-500 text-sm leading-6" key={i}>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#e4ebfd] to-white w-full rounded-t-xl py-5 px-4">
        <div className="flex items-end justify-between">
          <p className="text-sm text-gray-400 w-20">
            Rent{" "}
            <span className="block font-semibold text-customBlue text-lg">
              ₹ {vehicle.total ?? 0}
            </span>
          </p>
          <p className="text-sm text-gray-400 w-20">
            Security Deposit{" "}
            <span className="block font-semibold text-customBlue text-lg">
              ₹ {vehicle.deposit ?? 0}
            </span>
          </p>
          <button
            onClick={() => setIsBreakUpOpen((prev) => !prev)}
            className="underline text-sm text-gray-500 self-center cursor-pointer max-w-20"
          >
            {isBreakupOpen ? "Hide Breakup" : "Show Breakup"}
          </button>
        </div>

        <PriceBreakup
          price={vehicle.total}
          deposit={vehicle.deposit}
          breakUpOpen={isBreakupOpen}
        />
      </div>
    </div>
  );
};

export default CartItemInfo;
