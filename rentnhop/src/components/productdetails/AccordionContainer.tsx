import React, { useState } from "react";
import svgIcons from "../../icons/svgIcons";

const accordions = [
  {
    header: "Things to Remember",
    content: [
      "Minimum age of Renter should be 20 years.Orders will be cancelled with no rent refund in case the renter is underage as per the clause.",
      "Booking of any bike is subject to availability. Rentnhop reserves the right to cancel any booking if deemed necessary.",
      "In case of damage to the bike due to accident/mishandling/carelessness, appropriate charges will be calculated by our partner and the customer is liable to pay the same to our partner.",
      "In the case of theft, the customer is liable to pay in full the market rate of that product to our partner. During the rental tenure, full responsibility of the bike is on renter.",
      "In case of any fault or failure the customer needs to inform Customer Support / Partner immediately.",
      "The renter is not authorised to lend the Bike to any other person without informing RentnHop. In such cases the renter needs to verify documents of the additional Renter before the start of the trip. Failure to do so would attract a penalty of Rs 1000.",
      "Mentioned Security Deposit on every bike is mandatory. In case a customer refuses to pay Security Deposit , order stands cancel without any refunds.",
      "Pickup date/time and location cannot be changed once a booking is confirmed.",
      "The customer has to return the bike at the same location from where it was picked up. No requests will be accommodated for a change in drop location.",
      "If a customer rides the bike for more than 1500 km during the trip, he/she will have to get the bike serviced or can pay service charge.",
      "Daily Kilometre limit of bikes",
      "100-125cc - 150km/day",
      "150-220cc - 200km/day",
      "300-500cc - 250km/day",
      "Superbikes - 150km/day",
    ],
  },
  {
    header: "Cancellation & Rescheduling",
    content: [
      "The vehicle needs to be returned on or before the specified Date & time as mentioned during booking on the website/invoice copy. Delay in dropping vehicles by more than 30min, will attract a penalty of ₹100/hr.",
      "Please call our Customer Support in case you want to extend the Booking. Your trip will be extended if the vehicle is available. Trip extensions are subject to availability. Extension requests should be made at least 4 hrs before the Drop-off time. Extension without informing us, will attract a penalty of ₹100/hour + daily rental.",
      "As per the booking schedule, renter needs to return the vehicle on time. In case the customer doesn’t accept or drop the bike in spite of a denied extension request, penalty charges of ₹500/hr + daily rent of the bike will be applicable.",
      "Cancellation Charges are applicable as mentioned below:",
      "No Show/After Pickup time - 100% deduction",
      "In case of partial payment - 100% deduction.",
      "In case of full payment",
      "Before 72 hrs of the pickup time - 25% deduction.",
      "Between 24-72 hrs of the pickup time - 75% deduction.",
      "Between 0-24 hrs of the pickup time - 100% deduction.",
    ],
  },
  {
    header: "Documentation & Security Deposit Policy",
    content: [
      "Renter Should have a valid Driving Licence .",
      "Any two Govt. issued Documents will be verified at the time of pickup.",
      "Out of which one document will be deposited at the time of pickup and returned during drop off. In case of failure to furnish the documents, the order stands cancelled. No rent refund would be issued in such cases",
      "Valid Document – Passport, Election Card, Aadhar Card, PAN Card, ID Issued by Central or State Govt. (Any of the above) + Driving Licence (Digi-Locker is also accepted)",
    ],
  },
];
const AccordionContainer = () => {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  return (
    <div className="">
      {accordions.map((accordion, i) => (
        <div key={i} className="border border-gray-400 p-4 mx-2 rounded-2xl bg-white my-3">
          <div
            onClick={() => setOpenedIndex((prev) => (prev === i ? null : i))}
            className="flex items-center my-2 cursor-pointer"
          >
            <p
              className={`font-semibold ${
                openedIndex === i ? "text-customBlue underline" : ""
              } hover:underline`}
            >
              {accordion.header}
            </p>
            <div
              className={`ml-auto ${
                openedIndex === i ? "rotate-180 text-customBlue" : ""
              } transition-all duration-200`}
            >
              {svgIcons.dropDown()}
            </div>
          </div>
          <ul
            className={`${
              openedIndex === i ? "max-h-[3000px]" : "max-h-0 "
            } overflow-hidden px-4 transition-all duration-300 ease-in-out  text-justify list-outside list-disc`}
          >
            {accordion.content.map((content, j) => (
              <li key={j} className="my-2 text-sm text-gray-500">
                {content}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AccordionContainer;
