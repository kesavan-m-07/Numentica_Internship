import React from "react";
import { useFormContext } from "react-hook-form";

const DateInput = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const pickupDate = watch("pickupdate");
  const returnDate = watch("returndate");

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      {/* Pickup Date */}
      <div className="flex-1">
        <label
          htmlFor="pickupdate"
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          Pickup Date
        </label>
        <div className="flex cursor-pointer items-center gap-2 p-3 border border-[#989898]/30 rounded-lg bg-[#F6F6F6] w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={17} fill="none" > <path fill="#000" d="M13.75 1.25h-1.875V.625a.625.625 0 1 0-1.25 0v.625h-6.25V.625a.625.625 0 0 0-1.25 0v.625H1.25A1.25 1.25 0 0 0 0 2.5V15a1.25 1.25 0 0 0 1.25 1.25h12.5A1.25 1.25 0 0 0 15 15V2.5a1.25 1.25 0 0 0-1.25-1.25ZM3.125 2.5v.625a.625.625 0 0 0 1.25 0V2.5h6.25v.625a.625.625 0 1 0 1.25 0V2.5h1.875V5H1.25V2.5h1.875ZM13.75 15H1.25V6.25h12.5V15ZM8.437 9.062a.937.937 0 1 1-1.874 0 .937.937 0 0 1 1.875 0Zm3.438 0a.938.938 0 1 1-1.875 0 .938.938 0 0 1 1.875 0ZM5 12.188a.937.937 0 1 1-1.874 0 .937.937 0 0 1 1.874 0Zm3.438 0a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Zm3.437 0a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Z" /> </svg>
          <input
            type="date"
            className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
            min={today}
            {...register("pickupdate", {
              required: "Pickup date is required",
              validate: (value) => {
                const selected = new Date(value);
                const now = new Date(today);
                if (selected < now) {
                  return "Pickup date cannot be in the past";
                }
                return true;
              },
            })}
          />
        </div>
        {errors.pickupdate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.pickupdate.message}
          </p>
        )}
      </div>

      {/* Return Date */}
      <div className="flex-1">
        <label
          htmlFor="returndate"
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          Return Date
        </label>
        <div className="relative flex items-center gap-2 p-3 border border-[#989898]/30 rounded-lg bg-[#F6F6F6] w-full">
         <svg xmlns="http://www.w3.org/2000/svg" width={18} height={17} fill="none" > <path fill="#000" d="M13.75 1.25h-1.875V.625a.625.625 0 1 0-1.25 0v.625h-6.25V.625a.625.625 0 0 0-1.25 0v.625H1.25A1.25 1.25 0 0 0 0 2.5V15a1.25 1.25 0 0 0 1.25 1.25h12.5A1.25 1.25 0 0 0 15 15V2.5a1.25 1.25 0 0 0-1.25-1.25ZM3.125 2.5v.625a.625.625 0 0 0 1.25 0V2.5h6.25v.625a.625.625 0 1 0 1.25 0V2.5h1.875V5H1.25V2.5h1.875ZM13.75 15H1.25V6.25h12.5V15ZM8.437 9.062a.937.937 0 1 1-1.874 0 .937.937 0 0 1 1.875 0Zm3.438 0a.938.938 0 1 1-1.875 0 .938.938 0 0 1 1.875 0ZM5 12.188a.937.937 0 1 1-1.874 0 .937.937 0 0 1 1.874 0Zm3.438 0a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Zm3.437 0a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Z" /> </svg>
          <input
            type="date"
            className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
            min={pickupDate || today}
            {...register("returndate", {
              required: "Return date is required",
              validate: (value) => {
                if (!pickupDate) return "Please select a pickup date first";

                const pickup = new Date(pickupDate);
                const ret = new Date(value);
                const diffDays = (ret - pickup) / (1000 * 60 * 60 * 24);

                if (diffDays < 1) {
                  return "Return date must be at least 1 day after pickup";
                }
                return true;
              },
            })}
          />
        </div>
        {errors.returndate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.returndate.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DateInput;
