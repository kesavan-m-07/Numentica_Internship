import React, { useEffect, useState } from "react";
import { appState } from "../../store";
import svgIcons from "../../svg-icons/svgIcons";
import PriceBreakUpDetails from "./PriceBreakUpDetails";
import Counter from "../cart-page/Counter";
import {  useQuery } from "@tanstack/react-query";
import {
  citybikeInfo,
  databases,
  databaseId,
} from "../../app-write-files/AppWriteAccount";
import { Query } from "appwrite";
import { useUserCartUpdate } from "../../custom-hooks/userCartUpdate";
import { useNavigate } from "react-router";

const TripDetails = ({ vehicle, price, setPrice }) => {

  const navigate = useNavigate()

  const pickupDate = appState((state) => state.pickupDate);
  const returnDate = appState((state) => state.returnDate);
  const setCurrentVehicle = appState((state) => state.setCurrentVehicle);
  const difference = appState((state) => state.difference);
  const updateCart = useUserCartUpdate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const pickupDateObj = new Date(pickupDate);
  const returnDateObj = new Date(returnDate);

  const options = {
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

  const { data: areaVehicleList } = useQuery({
    queryKey: [vehicle.area_slug, vehicle.bike_slug],
    queryFn: async () => {
      const res = await databases.listRows({
        databaseId,
        tableId: citybikeInfo,
        queries: [
          Query.equal("area_slug", vehicle.area_slug),
          Query.equal("bike_slug", vehicle.bike_slug),
          Query.equal("status", "available"),
        ],
      });

      return res.rows;
    },
    enabled: !!vehicle?.area_slug && !!vehicle?.bike_slug,
    staleTime: 1000 * 60 * 5,
  });

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

  useEffect(() => {
    const { pricePerDay: basePrice } = vehicle;
    const vehicleDetail = {
      ...vehicle,
      ...vehicleInfo,
      basePrice: basePrice * difference.days,
      totalPrice: price + (basePrice * difference.days),
      formattedPickUpDate,
      formattedReturnDate,
      difference,
    };
    setCurrentVehicle(vehicleDetail);

    setSelectedVehicle(vehicleDetail);
  }, [vehicleInfo, vehicle, price, setCurrentVehicle]);

  const handleVehicleIncrement = (price) => {
    setVehicleInfo((prev) => ({
      vehicleCount: prev.vehicleCount + 1,
      vehicleLeft: prev.vehicleLeft - 1,
    }));
    setPrice((prev) => prev + price);
  };

  const handleVehicleDecrement = (price) => {
    setVehicleInfo((prev) => ({
      vehicleCount: prev.vehicleCount - 1,
      vehicleLeft: prev.vehicleLeft + 1,
    }));
    setPrice((prev) => prev - price);
  };

  const handleAddCart = () => {
    updateCart.mutate({selectedVehicle,areaVehicleList});
    navigate('/cart')
  };

  return (
    <div className="font-lufga px-2 space-y-3 md:shadow-[0_0_10px_rgba(0,0,0,.3)] md:rounded-2xl md:mr-3 overflow-hidden lg:p-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-[0_0_5px_rgba(0,0,0,.4)] md:shadow-none md:px-2">
        <p className="font-semibold">
          <span className="block text-xs text-gray-500 font-normal">
            Pickup Date
          </span>
          {formattedPickUpDate[0]} {formattedPickUpDate[1]}
          <span className="block text-sm font-normal ml-1">
            {formattedPickUpDate[2]}
          </span>
        </p>
        <p className="text-customBlue font-semibold text-xs lg:text-base">
          {difference.days}days,{difference.hours}hrs
        </p>
        <p className="font-semibold">
          <span className="block text-xs text-gray-500 font-normal">
            Return Date
          </span>
          {formattedReturnDate[0]} {formattedReturnDate[1]}
          <span className="block text-sm font-normal ml-1">
            {formattedReturnDate[2]}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-[0_0_5px_rgba(0,0,0,.4)] md:shadow-none">
        <p className="text-center">
          <span className="text-xs text-gray-500 block">Deposit</span>₹{" "}
          {vehicle.securityDeposit}
        </p>
        <p className="text-center">
          <span className="text-xs text-gray-500 block">Trip Limit</span>{" "}
          {vehicle.tripLimit} kms
        </p>
        <p className="text-center">
          <span className="text-xs text-gray-500 block">Extra Km Charge</span>₹
          5 per km
        </p>
      </div>
      <div className="flex items-center bg-customBlue text-white p-4 rounded-2xl gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={16}
          fill="none"
        >
          <path
            fill="currentColor"
            d="M8.125 6.187v5.687a.625.625 0 0 0 1.25 0V6.187a3.125 3.125 0 1 0-1.25 0Zm.625-4.938a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75Zm8.75 10.625c0 2.436-4.509 3.75-8.75 3.75S0 14.31 0 11.874c0-.604.298-1.494 1.719-2.297.958-.542 2.275-.959 3.81-1.205a.626.626 0 1 1 .195 1.237c-1.37.22-2.578.596-3.392 1.058-.687.387-1.082.828-1.082 1.207 0 1.044 2.853 2.5 7.5 2.5s7.5-1.456 7.5-2.5c0-.38-.395-.82-1.082-1.21-.817-.462-2.022-.838-3.392-1.058a.625.625 0 1 1 .198-1.234c1.535.246 2.853.663 3.81 1.205 1.418.803 1.716 1.693 1.716 2.297Z"
            style={{
              fill: "currentcolor",
              fillOpacity: 1,
            }}
          />
        </svg>
        <div className="flex-1">
          <p className="font-semibold">{vehicle.area_slug}</p>
          <p className="text-xs">
            Location Timings : {vehicle.startTime} to {vehicle.endTime}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-[0_0_5px_rgba(0,0,0,.4)] md:shadow-none md:justify-start md:gap-3">
        {svgIcons.moped(20)}
        <div>
          <p className="text-sm">No of vehicles to book</p>
          <span className="text-xs text-amber-500">
            {vehicleInfo.vehicleLeft} vehicles left
          </span>
        </div>

        <Counter
          handleVehicleDecrement={handleVehicleDecrement}
          handleVehicleIncrement={handleVehicleIncrement}
          price={vehicle.pricePerDay}
          vehicleInfo={vehicleInfo}
        />
      </div>
      <PriceBreakUpDetails price={price} deposit={vehicle.securityDeposit} addToCart ={handleAddCart}/>
    </div>
  );
};

export default TripDetails;
