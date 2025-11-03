import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { appState } from "../../Store";

const sortingOptions = [
  { label: "Price : High to Low", value: "price-HtL" },
  { label: "Price : Low to High", value: "price-LtH" },
  { label: "Hotseller", value: "hotseller" },
];
const SortBy = () => {
  const setSorted = appState(state=>state.setSelectedSort);
  const { register ,watch} = useFormContext();
  const sortValue = watch('sortSelected');

  useEffect(()=>{
    setSorted(sortValue)
  },[sortValue,setSorted])


  return (
    <div className="flex shadow-[0_0_10px_rgba(0,0,0,.2)] px-3 py-4 rounded-xl mt-6 items-center bg-white">
      <label htmlFor="sort" className="font-semibold text-sm">Sort by</label>
      <select
        name="sort"
        id="sort"
        {...register('sortSelected')}
        className="ml-auto outline-none appearance-none text-right text-ellipsis md:w-16 lg:w-25 text-sm cursor-pointer"
      >
        {sortingOptions.map((option, i) => (
          <option className="text-xs max-w-fit" key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex justify-center items-center">
        <svg
          className="w-5 h-5 text-gray-800 font-extralight ml-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortBy;
