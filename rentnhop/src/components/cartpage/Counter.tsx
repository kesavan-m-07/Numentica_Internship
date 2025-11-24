import React from 'react'

interface CounterProps {
  vehicleInfo: {
    vehicleCount: number;
    vehicleLeft: number;
  };
  handleVehicleIncrement: (price?: number) => void;
  handleVehicleDecrement: (price?: number) => void;
  price: number;
}

const Counter: React.FC<CounterProps> = ({vehicleInfo,handleVehicleIncrement,handleVehicleDecrement,price}) => {

  
  return (
    <div className="flex gap-2 md:gap-4 items-center md:ml-auto">
          <button
            onClick={() => handleVehicleDecrement(price)}
            className={`w-4 h-4 bg-gray-200 md:w-7 md:h-7 ${
              vehicleInfo.vehicleCount <= 1 &&
              "cursor-not-allowed pointer-events-none text-gray-400"
            } cursor-pointer flex justify-center rounded-full p-3 items-center`}
          >
            -
          </button>
          <p>{vehicleInfo.vehicleCount}</p>
          <button
            onClick={() => handleVehicleIncrement(price)}
            className={`w-4 h-4 bg-gray-200 md:w-7 md:h-7 ${
              vehicleInfo.vehicleLeft <= 0 &&
              "cursor-not-allowed pointer-events-none text-gray-400"
            } cursor-pointer flex justify-center rounded-full p-3 items-center`}
          >
            +
          </button>
        </div>
  )
}

export default Counter
