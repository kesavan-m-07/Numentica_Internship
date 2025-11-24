import React, { useEffect, useState } from "react";
import { appState } from "../../store";
import { useNavigate } from "react-router";
import { Bike, AppState } from "../../types";

interface VehicleCardProps {
  vehicle: Bike;
  selectedAreaOfBike?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  selectedAreaOfBike,
}) => {
  const navigate = useNavigate();
  const difference = appState((state: AppState) => state.difference);
  const sortSelected = appState((state: AppState) => state.selectedSort);
  const user = appState((state: AppState) => state.user);

  const areaKeys = Object.keys(vehicle.instances || {});
  const defaultArea = selectedAreaOfBike || areaKeys[0];
  const [selectedArea, setSelectedArea] = useState(defaultArea);

  const [vehicleCount, setVehicleCount] = useState(
    vehicle.instances[selectedArea]["vehicleCount"]
  );
  const [areaDetails, setAreaDetails] = useState(
    vehicle.instances[selectedArea]["highestInstance"] || {}
  );

  useEffect(() => {
    if (vehicle?.instances?.[selectedArea]) {
      const areaData = vehicle.instances[selectedArea];
      setVehicleCount(areaData.vehicleCount);
      if (sortSelected === "price-LtH") {
        setAreaDetails(areaData.lowestInstance);
      } else setAreaDetails(areaData.highestInstance);
    }
  }, [selectedArea, sortSelected, vehicle.instances]);

  const handleClick = () => {
    if (!user.username) {
      return navigate("/auth/login");
    } else {
      navigate(`/vehicle-detail/${areaDetails.$id}`);
    }
  };

  return (
    <div className=" pt-6 pl-5 shadow-[0_0_10px_rgba(0,0,0,0.3)] my-3 rounded-2xl overflow-hidden space-y-10 hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
      <div className="grid grid-cols-2 pr-5">
        <div className="">
          <h3 className="text-xl font-semibold">{vehicle.label}</h3>
          <p className="text-xs text-gray-500">{`⭐ ${areaDetails.rating} | ${areaDetails.tripCount} trips`}</p>
        </div>
        <div className="flex flex-col items-end">
          {JSON.parse(areaDetails?.tags || "[]").map((tag: string, i: number) => (
            <span
              key={i}
              className="bg-[#cdeecf] text-[#2ea84e] font-bold px-2 my-0.5 text-[9px] rounded-full w-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[35%_65%] ">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 ">Trip limit</p>
            <p className="mb-2">{areaDetails.tripLimit}km</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 ">Security Deposit</p>
            <p className="mb-2">Rs. {areaDetails.securityDeposit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 ">Location timings</p>
            <p className="mb-2">
              {areaDetails.startTime} - {areaDetails.endTime}
            </p>
          </div>
        </div>
        <div className="h-45 w-60">
          <img
            src={`/${vehicle.slug}.webp`}
            alt="bike"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2">
        <p className="text-lg font-semibold">
          ₹ {areaDetails.pricePerDay * difference.day}
          <span className="block font-light text-xs tracking-tighter underline text-gray-500">
            view packages
          </span>
        </p>
        <button
          onClick={handleClick}
          className="bg-black text-white rounded-3xl w-30 justify-self-center cursor-pointer hover:bg-customBlue transition duration-150"
        >
          Book Now
        </button>
      </div>

      <div className="bg-[#e6e7eb] text-black -ml-5 py-3 px-5 flex items-center gap-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={16}
          fill="none"
        >
          <path
            fill="currentColor"
            d="M8.125 6.187v5.687a.625.625 0 0 0 1.25 0V6.187a3.125 3.125 0 1 0-1.25 0Zm.625-4.938a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75Zm8.75 10.625c0 2.436-4.509 3.75-8.75 3.75S0 14.31 0 11.874c0-.604.298-1.494 1.719-2.297.958-.542 2.275-.959 3.81-1.205a.626.626 0 1 1 .195 1.237c-1.37.22-2.578.596-3.392 1.058-.687.387-1.082.828-1.082 1.207 0 1.044 2.853 2.5 7.5 2.5s7.5-1.456 7.5-2.5c0-.38-.395-.82-1.082-1.21-.817-.462-2.022-.838-3.392-1.058a.625.625 0 1 1 .198-1.234c1.535.246 2.853.663 3.81 1.205 1.418.803 1.716 1.693 1.716 2.297Z"
          />
        </svg>

        {areaKeys.length > 1 ? (
          <>
            <select
              name="area"
              id="area"
              className="outline-none appearance-none cursor-pointer text-sm"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              {areaKeys.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <svg
              className="w-5 h-5 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                clipRule="evenodd"
              />
            </svg>
          </>
        ) : (
          <p>{areaKeys[0]}</p>
        )}

        <p
          className={`ml-auto text-xs ${
            areaDetails.vehicleCount <= 2
              ? "text-red-500"
              : areaDetails.vehicleCount <= 4
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {vehicleCount} vehicle
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
