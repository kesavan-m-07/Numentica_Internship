import React, { useState } from "react";
import PriceBreakup from "./PriceBreakup";

interface PriceBreakUpDetailsProps {
  price: number;
  deposit: number;
  addToCart: () => void;
}

const PriceBreakUpDetails: React.FC<PriceBreakUpDetailsProps> = ({
  price,
  deposit,
  addToCart,
}) => {
  const [isBreakupOpen, setIsBreakupOpen] = useState(false);

  return (
    <div className="fixed bottom-0 md:relative  bg-linear-to-b from-[#e4ebfd] to-white w-full rounded-t-xl py-5 px-4 -mx-2 z-30 md:mx-0">
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-xl font-semibold text-customBlue">₹ {price}</p>
          <button
            onClick={() => setIsBreakupOpen((prev) => !prev)}
            className="underline text-xs text-gray-500 cursor-pointer"
          >
            {isBreakupOpen ? "Hide breakup" : "Show breakup"}
          </button>
        </div>
        <button
          onClick={addToCart}
          className="font-semibold w-30 bg-customBlue text-white py-2 rounded-3xl cursor-pointer"
        >
          Add to cart
        </button>
      </div>
      <PriceBreakup
        breakUpOpen={isBreakupOpen}
        deposit={deposit}
        price={price}
      />
    </div>
  );
};

export default PriceBreakUpDetails;
