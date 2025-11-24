import React, { useMemo } from "react";
import FilterCheckbox from "./FilterCheckbox";
import { useFormContext } from "react-hook-form";

interface FiltersListProps {
  filters: { label: string; value: string }[];
  type: string;
}

const FiltersList: React.FC<FiltersListProps> = React.memo(
  ({ filters, type }) => {
    const { register, watch } = useFormContext();

    const currentLocationSearch = watch("searchLocation");

    const filteredList = useMemo(() => {
      if (!currentLocationSearch || type !== "locations") return filters;
      return filters?.filter((filter) =>
        filter.label.toLowerCase().startsWith(currentLocationSearch.toLowerCase())
      );
    }, [currentLocationSearch, filters, type]);

    return (
      <div className="my-5">
        <h3 className="my-2 font-semibold text-sm">{type}</h3>
        {type === "locations" && (
          <div className="flex items-center my-3 bg-[#e9eaed] p-3 rounded-3xl focus-within:outline focus-within:outline-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={9}
              height={18}
              fill="none"
            >
              <path
                fill="#242424"
                d="M8.75 4.375a4.375 4.375 0 1 0-5 4.33v8.17a.625.625 0 1 0 1.25 0v-8.17a4.382 4.382 0 0 0 3.75-4.33ZM4.375 7.5a3.125 3.125 0 1 1 0-6.25 3.125 3.125 0 0 1 0 6.25Z"
                style={{
                  fill: "#656565",
                  fillOpacity: 1,
                }}
              />
            </svg>
            <input
              type="text"
              {...register("searchLocation")}
              className="outline-none pl-2 text-ellipsis w-[95%]"
              placeholder="Search Location"
            />
          </div>
        )}
        <div className="space-y-3">
          {filteredList?.map((filter, i) => (
            <FilterCheckbox
              key={i}
              label={filter.label}
              value={filter.value}
              type={type}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default FiltersList;
