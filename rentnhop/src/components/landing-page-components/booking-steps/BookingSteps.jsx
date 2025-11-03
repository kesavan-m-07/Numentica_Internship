import React from "react";
import svgIcons from "../../../svg-icons/svgIcons";

const BookingSteps = () => {
  const cards = [
    {
      title: "Choose Location",
      details:
        "Pick your destination – whether it’s a sunset chase or city vibes, your adventure starts here. Ready to ride? Choose your spot now",
      svg: svgIcons.location(50, "text-customBlue"),
    },
    {
      title: "Confirm Reservation",
      details:
        "Lock in your ride with a quick step to secure your spot. Confirm your reservation, & you’re one step closer to the road ahead!",
      svg: svgIcons.calender(50, "text-customBlue"),
    },
    {
      title: "Pickup Your vehicle",
      details:
        "Swing by, grab your vehicle, and feel the power beneath you. The road is calling, so pick up your ride and let the adventure begin!",
      svg: svgIcons.moped(50, "text-customBlue"),
    },
  ];
  return (
    <section className="bg-[#F5FAFF] font-lufga py-16">
      <p className="text-customBlue font-semibold text-sm text-center">
        How It Works
      </p>
      <h2 className="text-3xl md:text-5xl font-bold text-center mt-3">
        Rent a bike in Delhi in 3 easy steps
      </h2>
      <div className="flex flex-col md:flex-row mt-10 justify-between mx-5 md:mx-10 gap-10 md:bg-[url('bookingStepsBg.png')] bg-contain bg-no-repeat bg-center">
        {cards.map((card,i) => (
          <div key={i} className="flex space-y-5 flex-col justify-center items-center p-10 shadow-[0_0_10px_rgba(0,0,0,.2)] w-full md:w-5/17 rounded-2xl bg-white hover:scale-105 transition duration-500">
            {card.svg}
            <h3 className="text-black text-center text-3xl font-bold">
              {card.title}
            </h3>
            <p className="text-black text-center text-sm">{card.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingSteps;
