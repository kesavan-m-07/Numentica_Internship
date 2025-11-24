import React, { useEffect, useState } from "react";
import { appState } from "../../store";
import svgIcons from "../../icons/svgIcons";
import PriceBreakUpDetails from "./PriceBreakUpDetails";
import Counter from "../cartpage/Counter";
import { useAreaVehicleList } from "../../query/useAreaVehicleList";
import { useUserCartUpdate } from "../../query/useUserCartUpdate";
import { useNavigate } from "react-router";
import { BikeInstance, AppState } from "../../types";

interface TripDetailsProps {
  vehicle: BikeInstance;
  price: number;
}

const TripDetails: React.FC<TripDetailsProps> = ({ vehicle, price }) => {
  const navigate = useNavigate();

  const pickupDate = appState((state: AppState) => state.pickupDate);
  const returnDate = appState((state: AppState) => state.returnDate);
  const difference = appState((state: AppState) => state.difference);

  const updateCart = useUserCartUpdate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const pickupDateObj = new Date(pickupDate);
  const returnDateObj = new Date(returnDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    hour12: true,
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedPickUpDate = pickupDateObj
    .toLocaleString("en-US", options)
    .split(",");

  const formattedReturnDate = returnDateObj
    .toLocaleString("en-US", options)
    .split(",");

  const { data: areaVehicleList } = useAreaVehicleList(vehicle.area_slug, vehicle.bike_slug);

  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleCount: 1,
    vehicleLeft: 0,
  });

  useEffect(() => {
    if (areaVehicleList && areaVehicleList.length > 0) {
      setVehicleInfo({
        vehicleCount: 1,
        vehicleLeft: Math.max(areaVehicleList.length - 1, 0),
      });
    }
  }, [areaVehicleList]);

  const tripBasePrice =
    vehicle.pricePerDay * difference.day * vehicleInfo.vehicleCount;

  const grandTotal = tripBasePrice + price;

  useEffect(() => {
    const vehicleDetail = {
      ...vehicle,
      ...vehicleInfo,
      basePrice: tripBasePrice,
      totalPrice: grandTotal,
      formattedPickUpDate,
      formattedReturnDate,
      difference,
    };

    setSelectedVehicle(vehicleDetail);
  }, [vehicleInfo, vehicle, tripBasePrice, grandTotal]);

  const handleVehicleIncrement = () => {
    setVehicleInfo((prev) => ({
      vehicleCount: prev.vehicleCount + 1,
      vehicleLeft: prev.vehicleLeft - 1,
    }));
  };

  const handleVehicleDecrement = () => {
    setVehicleInfo((prev) => ({
      vehicleCount: prev.vehicleCount - 1,
      vehicleLeft: prev.vehicleLeft + 1,
    }));
  };

  const handleAddCart = () => {
    updateCart.mutate({ selectedVehicle, areaVehicleList });
    navigate("/cart");
  };

  return (
    <div className=" px-2 space-y-3 md:shadow-[0_0_10px_rgba(0,0,0,.3)] md:rounded-2xl md:mr-3 overflow-hidden lg:p-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">
        <p className="font-semibold">
          <span className="block text-xs text-gray-500">Pickup Date</span>
          {formattedPickUpDate[0]} {formattedPickUpDate[1]}
          <span className="block text-sm">{formattedPickUpDate[2]}</span>
        </p>

        <p className="text-customBlue font-semibold text-xs lg:text-base">
          {difference.day} days, {difference.hours} hrs
        </p>

        <p className="font-semibold">
          <span className="block text-xs text-gray-500">Return Date</span>
          {formattedReturnDate[0]} {formattedReturnDate[1]}
          <span className="block text-sm">{formattedReturnDate[2]}</span>
        </p>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-[0_0_5px_rgba(0,0,0,.4)] md:shadow-none">
        {" "}
        <p className="text-center">
          {" "}
          <span className="text-xs text-gray-500 block">Deposit</span>₹{" "}
          {vehicle.securityDeposit}{" "}
        </p>{" "}
        <p className="text-center">
          {" "}
          <span className="text-xs text-gray-500 block">Trip Limit</span>{" "}
          {vehicle.tripLimit} kms{" "}
        </p>{" "}
        <p className="text-center">
          {" "}
          <span className="text-xs text-gray-500 block">Extra Km Charge</span>₹
          5 per km{" "}
        </p>{" "}
      </div>

      <div className="flex items-center bg-customBlue text-white p-4 rounded-2xl gap-3">
        {svgIcons.location(18)}
        <div className="flex-1">
          <p className="font-semibold">{vehicle.area_slug}</p>
          <p className="text-xs">
            Location Timings : {vehicle.startTime} to {vehicle.endTime}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow md:justify-start md:gap-3">
        {svgIcons.moped(20)}
        <div>
          <p className="text-sm">No of vehicles to book</p>
          <span className="text-xs text-amber-500">
            {vehicleInfo.vehicleLeft} vehicles left
          </span>
        </div>

        <Counter
          handleVehicleIncrement={handleVehicleIncrement}
          handleVehicleDecrement={handleVehicleDecrement}
          price={vehicle.pricePerDay}
          vehicleInfo={vehicleInfo}
        />
      </div>

      <PriceBreakUpDetails
        price={grandTotal}
        deposit={vehicle.securityDeposit}
        addToCart={handleAddCart}
      />
    </div>
  );
};

export default TripDetails;
