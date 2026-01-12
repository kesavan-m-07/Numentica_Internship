import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  addDays,
  addHours,
  differenceInHours,
  startOfDay,
  endOfDay,
} from "date-fns";
import CustomDatePicker from "./CustomDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { appState } from "../../store";
import { AppState } from "../../types";

const DateInputs = () => {
  const now = new Date();
  const [difference, setDifference] = useState({ days: 1, hours: 0 });
  const updateDifference = appState((state: AppState) => state.updateDiffrence);
  const setPickupDate = appState((state: AppState) => state.setPickupDate);
  const setReturnDate = appState((state: AppState) => state.setReturnDate);
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pickup: now,
      return: addHours(now, 24),
    },
  });

  const pickupDate = watch("pickup");
  const returnDate = watch("return");

  useEffect(() => {
    if (!pickupDate || !returnDate) return;
    const minReturn = addHours(pickupDate, 24);
    if (returnDate < minReturn) {
      setValue("return", minReturn, { shouldValidate: true });
      return;
    }
    const hoursDiff = differenceInHours(returnDate, pickupDate);
    const days = Math.floor(hoursDiff / 24);
    const hours = hoursDiff % 24;
    setDifference({ days, hours });
    setPickupDate(pickupDate);
    setReturnDate(returnDate);
    updateDifference({ day: days, hours });
  }, [
    pickupDate,
    returnDate,
    setPickupDate,
    setReturnDate,
    setValue,
    updateDifference,
  ]);

  const minReturnDate = addHours(pickupDate, 24);
  const returnMinTime =
    minReturnDate.toDateString() === returnDate.toDateString()
      ? minReturnDate
      : startOfDay(minReturnDate);

  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row w-full sticky bg-white z-10 top-0 shadow-[0_2px_10px_rgba(0,0,0,0.2)] md:shadow-none max-w-[calc(100%-1rem)] rounded-lg m-2 items-end gap-4  px-2 py-3 md:p-5"
    >
      <Controller
        name="pickup"
        control={control}
        render={({ field }) => (
          <CustomDatePicker
            field={field}
            label="Pickup Date"
            minDate={now}
            maxDate={addDays(now, 45)}
            difference={null}
          />
        )}
      />
      {errors.pickup && (
        <p className="text-red-500 text-xs">{errors.pickup.message}</p>
      )}

      <Controller
        name="return"
        control={control}
        render={({ field }) => (
          <CustomDatePicker
            field={field}
            label="Return Date"
            minDate={minReturnDate}
            maxDate={addDays(pickupDate, 45)}
            minTime={returnMinTime}
            maxTime={endOfDay(field.value || minReturnDate)}
            difference={difference}
          />
        )}
      />
      {errors.return && (
        <p className="text-red-500 text-xs">{errors.return.message}</p>
      )}

      <button
        type="submit"
        className="hidden md:block w-[30%] bg-customBlue text-white px-10 py-2 text-sm rounded-4xl"
      >
        Search
      </button>
      <button
        type="submit"
        className="md:hidden bg-customBlue p-2 rounded-full flex items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="w-4 h-4 text-white"
          aria-hidden="true"
        >
          <path d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </button>
    </form>
  );
};

export default DateInputs;
