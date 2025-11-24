import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductDetails from "../components/productdetails/ProductDetails";
import TripDetails from "../components/productdetails/TripDetails";
import VehicleSpec from "../components/productdetails/VehicleSpec";
import Addons from "../components/productdetails/Addons";
import AccordionContainer from "../components/productdetails/AccordionContainer";
import { useVehicleDetails } from "../query/useVehicleDetails";
import { useBikeInfo } from "../query/useBikeInfo";


const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();

  const { data: vehicle, isLoading, isError, error } = useVehicleDetails(vehicleId);
  const { data: bikeDetails } = useBikeInfo(vehicle?.bike_slug);


  const navigate = useNavigate();

  const [addonePrice, setAddonePrice] = useState(0);


  if (!vehicle && !isLoading) {
    navigate("/search");
  }

  if (isLoading) return <p>Loading vehicle...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="flex flex-col md:flex-row gap-5 w-full ">
      <div className="flex-1 h-auto overflow-y-visible md:overflow-y-scroll pr-0 md:pr-4 no-scrollbar">
        <div className="flex flex-col">
          <ProductDetails vehicle={vehicle} vehicleInfo={bikeDetails} />
          <div className="block md:hidden">
            <TripDetails
              vehicle={vehicle}
              price={addonePrice}
              
            />
          </div>
        </div>
        <VehicleSpec spec={bikeDetails?.specs || '[]'} />
        <Addons setPrice={setAddonePrice} />
        <AccordionContainer />
      </div>

      <div className="hidden md:block md:w-[40%] lg-w[30%] md:sticky md:top-26 md:self-start lg:self-start">
        <TripDetails
          vehicle={vehicle}
          price={addonePrice}
        />
      </div>
    </section>

  );
};

export default VehicleDetailsPage;
