import CardsSwiper from "./CardsSwiper";
import { appState } from "../../../store";
const HotSellers = () => {
  const selectedLocation = appState(state=>state.selectedLocation)
  return (
    <section className="bg-[#F5FAFF] pt-10  p-2 ">
      <p className="text-customBlue font-semibold text-center">Our Fleet</p>
      <h2 className="text-3xl w-[90%] mx-auto md:text-5xl font-bold text-center m-3">Explore our most rented bikes in <span className="capitalize">{selectedLocation}</span></h2>
      <CardsSwiper/>
    </section>
  );
};

export default HotSellers;
