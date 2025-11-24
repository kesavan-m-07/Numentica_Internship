import  { useState } from "react";
import DateInputs from "../components/searchresult/DateInputs";
import Sidebar from "../components/searchresult/Sidebar";
import VehicleList from "../components/searchresult/VehicleList";
import { combineMultipleInstances, attachBikeDetailsWithBike, applyFilters } from "../utils/BikesUtilities";
import { appState } from "../store";
import { useCityInfo } from "../query/useCityInfo";
import { useCityBikes } from "../query/useCityBikes";
import { useAllBikes } from "../query/useAllBikes";
import Loader from "../dumb-components/Loader";
import { AppState } from "../types";

const SearchResult = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const selectedArea = appState((state: AppState) => state.selectedLocation);
  const [filters, setFilters] = useState({
    categories: [],
    makers: [],
    locations: [],
  });

  const {
    data: cityData,
    isLoading,
    error,
  } = useCityInfo(selectedArea);

  const { data: bikesInfo, isLoading: isBikesLoading } = useCityBikes(cityData?.rows[0]?.areas);

  const combinedBikes = bikesInfo && combineMultipleInstances(bikesInfo);

  const { data: bikesDetail } = useAllBikes();

  const fullBikeInfo = (combinedBikes && bikesDetail) && attachBikeDetailsWithBike(combinedBikes, bikesDetail);

  const filteredVehicles = fullBikeInfo && applyFilters(filters, fullBikeInfo);


  if (isLoading) return <Loader text={'Loading..'} />;
  if (isBikesLoading) return <Loader text={'Loding bikes...'} />;
  if (error) return <p>Error loading vehicles!</p>;

  return (
    <section className="bg-[#F5FAFF] flex ">
      <Sidebar
        filterOpen={isFilterOpen}
        toggleFilter={setIsFilterOpen}
        setFilters={setFilters}
      />
      <div className="flex-1 space-y-3">
        <DateInputs />
        <VehicleList vehicleList={filteredVehicles} />
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
