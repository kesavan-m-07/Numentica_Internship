import icons from "../../../icons/svgIcons";
import { appState } from "../../../store";

const cardDetails = [
  { detail: "1000+ Bikes & Largest Fleet From Scooters to Superbikes", icon: icons.moped(40) },
  { detail: "Lowest Price Guarantee Ride more, spend less", icon: icons.price(40) },
  { detail: "Quick & Easy Booking Instant confirmation", icon: icons.booking(40) },
  { detail: "24/7 Assistance We’ve got your back always", icon: icons.support(40) },
];
const InfoCards = () => {
  const selectedLocation = appState(state=>state.selectedLocation)
  return (
    <section className=" my-5">
      <h2 className="text-3xl md:text-5xl text-center font-bold">
        Why choose Rentnhop for Renting a bike in{" "}
        <span className="capitalize">{selectedLocation}</span>?
      </h2>
      <div className="flex flex-col md:flex-row gap-5 gap-y-8 items-center justify-center lg:justify-between p-5 mt-3 flex-wrap">
        {cardDetails?.map((card,i) => (
          <div key={i} className="text-customBlue flex flex-col gap-5 items-center shadow-[0_0_10px_rgba(0,0,0,.2)] md:min-w-72 w-full md:w-72 py-10 px-5 rounded-2xl hover:bg-customBlue/15 transition duration-150 ease-linear">
            {card.icon}
            <p className="text-black text-center font-semibold">{card.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
