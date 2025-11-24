import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { appState } from "../../../store";
import { AppState } from "../../../types";

const locations = [
  { value: "chennai", label: "Chennai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "trichy", label: "Trichy" },
  { value: "delhi", label: "Delhi" },
  { value: "coimbatore", label: "Coimbatore" },
  { value: "thanjavur", label: "Thanjavur" },
];

const CitySelect = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const updateLocation = appState((state: AppState) => state.updateLocation);
  const selectedLocationFromStore = appState((state: AppState) => state.selectedLocation);
  const selectedLocation = watch("city");

  useEffect(() => {
    updateLocation(selectedLocation);
  }, [selectedLocation, updateLocation]);

  return (
    <div>
      <label htmlFor="city" className="block text-xs font-medium text-gray-700">
        Select City
      </label>

      <div className="flex items-center gap-2 p-3 border border-[#989898]/30 rounded-lg bg-[#F6F6F6]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={18}
          fill="none"
        >
          <path
            fill="#000"
            d="M6.875 3.75a3.125 3.125 0 1 0 0 6.25 3.125 3.125 0 0 0 0-6.25Zm0 5a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75Zm0-8.75A6.883 6.883 0 0 0 0 6.875c0 2.453 1.134 5.053 3.281 7.52a19.859 19.859 0 0 0 3.239 2.992.625.625 0 0 0 .717 0 19.856 19.856 0 0 0 3.232-2.992c2.144-2.467 3.281-5.067 3.281-7.52A6.883 6.883 0 0 0 6.875 0Zm0 16.094C5.584 15.078 1.25 11.348 1.25 6.875a5.625 5.625 0 0 1 11.25 0c0 4.471-4.334 8.203-5.625 9.219Z"
            style={{
              fill: "#000",
              fillOpacity: 0.5,
            }}
          />
        </svg>

        <select
          id="city"
          value={selectedLocationFromStore}
          {...register("city", { required: "City is required" })}
          className="w-full outline-none border-none bg-[#F6F6F6] appearance-none text-gray-700  text-sm cursor-pointer"
        >
          {locations.map((location, i) => (
            <option key={i} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>

      {errors.city && (
        <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>
      )}
    </div>
  );
};

export default CitySelect;
