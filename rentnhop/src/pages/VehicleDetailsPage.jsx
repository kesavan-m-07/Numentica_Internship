import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProductDetails from "../components/product-details-page.jsx/ProductDetails.jsx";
import TripDetails from "../components/product-details-page.jsx/TripDetails.jsx";
import VehicleSpec from "../components/product-details-page.jsx/VehicleSpec.jsx";
import Addons from "../components/product-details-page.jsx/Addons.jsx";
import AccordionContainer from "../components/product-details-page.jsx/AccordionContainer.jsx";
import {
  databases,
  databaseId,
  citybikeInfo,
  bikeInfo,
} from "../app-write-files/AppWriteAccount";
import { Query } from "appwrite";


const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  const { data: vehicle, isLoading, isError, error } = useQuery({
  queryKey: ["vehicle", vehicleId],
  queryFn: async () => {
    const data = await databases.getRow({
      databaseId,
      tableId: citybikeInfo,
      rowId: vehicleId,
    });
    return data;
  },
  enabled: !!vehicleId,
  staleTime: 1000 * 60 * 5,
});


const { data: bikeDetails } = useQuery({
  queryKey: ["bike-info", vehicle?.bike_slug],
  queryFn: async () => {
    const res = await databases.listRows({
      databaseId,
      tableId: bikeInfo,
      queries: [Query.equal("slug", vehicle.bike_slug)],
    });
    return res.rows?.[0];
  },
  enabled: !!vehicle?.bike_slug,
});


  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(vehicle?.pricePerDay ?? 0);

  useEffect(() => {
    if (vehicle?.pricePerDay) {
      setTotalPrice(vehicle.pricePerDay);
    }
  }, [vehicle]);

  if (!vehicle) {
    navigate("/search");
  }

  if (isLoading) return <p>Loading vehicle...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="flex flex-col md:flex-row gap-5 w-full font-lufga">
      <div className="flex-1 h-auto md:h-[calc(100vh-80px)] overflow-y-visible md:overflow-y-scroll pr-0 md:pr-4 no-scrollbar">
        <div className="flex flex-col">
          <ProductDetails vehicle={vehicle} vehicleInfo={bikeDetails} />
          <div className="block md:hidden">
            <TripDetails
              vehicle={vehicle}
              price={totalPrice}
              setPrice={setTotalPrice}
            />
          </div>
        </div>
        <VehicleSpec spec={bikeDetails?.specs || '[]'} />
        <Addons basePrice={totalPrice} setPrice={setTotalPrice} />
        <AccordionContainer />
      </div>

      <div className="hidden md:block md:w-[40%] lg-w[30%] md:sticky md:top-20 md:self-start lg:self-end">
        <TripDetails
          vehicle={vehicle}
          price={totalPrice}
          setPrice={setTotalPrice}
        />
      </div>
    </section>

  );
};

export default VehicleDetailsPage;
