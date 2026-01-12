import React from "react";
import FiltersList from "./FiltersList";
import { appState } from "../../Store";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import {
  databaseId,
  cityInfo,
  databases,
} from "../../app-write-files/AppWriteAccount";
import { extractLabel } from "../../Utils/BikesUitilities";

const Filters = () => {
  const baseFilters = {
    categories: [
      { label: "Geared", value: "geared" },
      { label: "Gearless", value: "gearless" },
    ],
    makers: [
      { label: "KTM", value: "ktm" },
      { label: "Honda", value: "honda" },
      { label: "Yamaha", value: "yamaha" },
      { label: "Bajaj", value: "bajaj" },
      { label: "Ducati", value: "ducati" },
    ],
  };

  const selectedLocationFromStore = appState((state) => state.selectedLocation);

  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["city-info", selectedLocationFromStore],
    queryFn: async () => {
      const res = await databases.listRows({
        databaseId,
        tableId: cityInfo,
        queries: [Query.equal("slug", selectedLocationFromStore)],
      });

      return res;
    },
    enabled: !!selectedLocationFromStore,
  });

  const areaOptions = cityData && extractLabel(cityData);
  const filters = { locations: areaOptions, ...baseFilters };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-5 shadow-[0_0_20px_1px_rgba(0,0,0,.3)] rounded-lg p-5 font-lufga bg-white">
      <h3 className="text-lg font-bold">Filters</h3>
      {Object.entries(filters).map(([key, value]) => (
        <FiltersList
          key={`${key}-${JSON.stringify(value)}`}
          type={key}
          filters={value}
        />
      ))}
    </div>
  );
};

export default Filters;
