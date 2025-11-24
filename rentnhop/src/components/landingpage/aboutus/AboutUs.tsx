import React from "react";
import aboutUs from "/aboutus.jpg";
import svgIcons from "../../../icons/svgIcons";

const AboutUs = () => {
  const infoCards = [
    { count: "25+", label: "Cities", svg: svgIcons.building(40) },
    { count: "12,000+", label: "Vehicle", svg: svgIcons.moped(40) },
    { count: "300,000+", label: "Happy Customers", svg: svgIcons.mask(40) },
    { count: "4.8/5", label: "6800+ reviews", svg: svgIcons.prayingHands(40) },
  ];
  return (
    <section className="bg-[#F5FAFF] py-2 md:py-10  md:flex">
      <img src={aboutUs} alt="aboutusImage" className="w-full md:w-2/5 " loading="lazy" />
      <div className="px-8 lg:px-14 mt-5 md:mt-0">
        <p className="font-semibold text-customBlue text-center">About Us</p>
        <h2 className="text-center md:text-left font-bold text-2xl lg:text-5xl my-2">
          Feel The Best Experience With RentnHop Leh ladakh bike rental
        </h2>
        <article className="mb-3 text-sm/7 ">
          Leh is one of the few places for which people will fall in love
          easily. It’s a hassle-free city with an enchanting look framed with
          snow-capped mountains around the top and ice-filled lakes at the
          bottom linking to the beautiful Ladakhi homes and people. But you will
          take some time to settle RentnHop, based in India, is a top-tier
          Motorcycle Rental Platform with a widespread presence in major cities
          like Delhi, Mumbai, Leh, Manali, Goa, Chandigarh, Rishikesh, and
          Mussoorie. For travelers exploring Leh, getting a bike on rent in Leh
          offers unmatched convenience, sparing you the hassles and costs tied
          to bike ownership and maintenance. Whether you prefer a Honda Activa
          or a powerful Hayabusa, RentnHop’s extensive fleet has you covered.
          With pickup points strategically placed near key tourist attractions
          and hotspots, your journey begins with ease.
        </article>
        <article className="mb-3 text-sm/7">
          RentnHop ensures a smooth scooty on rent in Leh experience, offering
          hassle-free reservations, 24/7 assistance, and mechanic support to
          keep your ride trouble-free. Their services also include complimentary
          accessories, cloakroom services, and convenient delivery and pickup
          options, making it a perfect choice for all your rental needs.
        </article>
        <article className="mb-3 text-sm/7">
          Recognized for its excellence and innovation in Passenger
          Transportation Services, RentnHop proudly holds the #StartupIndia
          recognition, with certificate no DIPP67514. The company’s ambitious
          goal is to build the world’s largest Motorcycle Rental platform, and
          with their transparent and affordable pricing, they are well on their
          way. If you're planning to explore the rugged landscapes of Leh, trust
          RentnHop to provide bike rental in Leh experience that is both
          reliable and budget-friendly. Whether you're embarking on a solo
          adventure or a group trip, RentnHop ensures you have the best ride for
          your journey.
        </article>
        <button className="flex items-center justify-center mt-10 underline text-sm">
          MORE ABOUT US {svgIcons.upArrow(40, "mt-7 ml-2")}
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-[#061C34] md:-translate-x-20 md:-translate-y-5 mt-10 ">
          {infoCards.map((card,i) => (
            <div key={i} className="flex flex-col items-center justify-center text-white py-5 border-b lg:border-b-transparent border-r">
              {card.svg}
              <h4 className="text-3xl font-semibold my-2">{card.count}</h4>
              <p className="text-sm w-1/2 text-center">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
