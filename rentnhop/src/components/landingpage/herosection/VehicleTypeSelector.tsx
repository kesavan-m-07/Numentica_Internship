import React from "react";
import { useFormContext } from "react-hook-form";

const options = [
  { id: "bike", label: "Bike" },
  { id: "car", label: "Car" },
];
const VehicleTypeSelector = () => {
  const { register, watch } = useFormContext(); 
  const selected = watch("vehicle"); 


  return (
    <div className="flex w-max  border rounded-lg overflow-hidden">
      {options.map(({ id, label }) => (
        <label
          key={id}
          htmlFor={id}
          
          className={`flex items-center gap-2 px-3 py-1 cursor-pointer transition border bg-white
            ${
              selected === id
                ? " text-[#2563EA] border-[#2563EA]"
                : " text-gray-700 border-transparent"
            }`}
        >
          <input
            type="radio"
            id={id}
            value={id}
            {...register("vehicle", { required: "Vehicle type is required" })}
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={13}
            height={17}
            fill="none"
            className="text-current"
          >
            <path
              fill="currentColor"
              d="M11.813 2.253h-2.87a2.812 2.812 0 0 0-5.512 0H.562a.562.562 0 1 0 0 1.125h2.87c.121.593.431 1.131.884 1.534a4.506 4.506 0 0 0-2.628 4.09v4.5a1.125 1.125 0 0 0 1.125 1.126h1.124a2.25 2.25 0 1 0 4.5 0h1.126a1.125 1.125 0 0 0 1.124-1.125v-4.5A4.506 4.506 0 0 0 8.06 4.912c.453-.403.763-.94.885-1.534h2.868a.562.562 0 1 0 0-1.125Zm-4.5 12.375a1.125 1.125 0 0 1-2.25 0v-3.375a1.125 1.125 0 0 1 2.25 0v3.375Zm2.25-5.625v4.5H8.437v-2.25a2.25 2.25 0 0 0-4.5 0v2.25H2.813v-4.5a3.375 3.375 0 0 1 6.75 0ZM4.5 2.815a1.687 1.687 0 1 1 3.375 0 1.687 1.687 0 0 1-3.375 0Z"
            />
          </svg>
          {label}
        </label>
      ))}
    </div>
  );
};

export default VehicleTypeSelector;
