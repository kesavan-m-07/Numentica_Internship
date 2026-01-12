import React, { useState } from "react";
import DateInputs from "../components/search-result/DateInputs";
import Sidebar from "../components/search-result/Sidebar";
import VehicleList from "../components/search-result/VehicleList";
import { combineMultipleInstances,attachBikeDetailsWithBike ,applyFilters} from "../Utils/BikesUitilities";
import { appState } from "../store";
import { useQuery } from "@tanstack/react-query";
import {
  cityInfo,
  databases,
  databaseId,
  citybikeInfo,
  bikeInfo
} from "../app-write-files/AppWriteAccount";
import { Query } from "appwrite";

const SearchResult = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const selectedArea = appState((state) => state.selectedLocation);
  const [filters, setFilters] = useState({
    categories: [],
    makers: [],
    locations: [],
  });

  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["city-info", selectedArea],
    queryFn: async () => {
      const res = await databases.listRows({
        databaseId,
        tableId: cityInfo,
        queries: [Query.equal("slug", selectedArea)],
      });

      return res;
    },
    enabled: !!selectedArea,
  });


  const { data: bikesInfo, isLoading: isBikesLoading } = useQuery({
    queryKey: ["bike-info", selectedArea],
    queryFn: async () => {
      const areas = cityData.rows[0].areas || [];
      return databases.listRows({
        databaseId,
        tableId: citybikeInfo,
        queries: [Query.contains('area_slug',areas),Query.limit(1000),Query.equal('status','available')],
      })
    },
    enabled: !!cityData,
  });


  const combinedBikes = bikesInfo && combineMultipleInstances(bikesInfo);

  const {data:bikesDetail,isLoading:isBikeDetailsLoading} = useQuery({
    queryKey:['bike_slugs'],
    queryFn:async()=>{
      return await databases.listRows({
        databaseId,
        tableId:bikeInfo,
        queries:[]
      })
    }
  })

  const fullBikeInfo = (combinedBikes && bikesDetail) && attachBikeDetailsWithBike(combinedBikes,bikesDetail);

  const filteredVehicles = fullBikeInfo &&  applyFilters(filters, fullBikeInfo);


  if (isLoading) return <p>Loading...</p>;
  if (isBikesLoading) return <p>Loading bikes...</p>;
  if (error) return <p>Error loading vehicles!</p>;

  return (
    <section className="bg-[#F5FAFF] flex font-lufga">
      <Sidebar
        filterOpen={isFilterOpen}
        toggleFilter={setIsFilterOpen}
        setFilters={setFilters}
      />
      <div className="flex-1 space-y-3">
        <DateInputs />
        <VehicleList vehicleList={filteredVehicles}  />
        <img
          src="/product-banner.avif"
          alt="product banner"
          className="cursor-pointer"
        />
      </div>
      <button
        onClick={() => setIsFilterOpen((prev) => !prev)}
        className="fixed bottom-5 left-[50%] -translate-x-[50%] bg-black py-3 px-6 text-sm text-white rounded-4xl flex items-center gap-2 md:hidden"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
        >
          <path
            fill="currentColor"
            d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z"
          ></path>
        </svg>
        Filters
      </button>
    </section>
  );
};

export default SearchResult;
