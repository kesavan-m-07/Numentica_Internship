import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";

import { Vehicle } from "../types";

interface PaymentInfoProps {
  cartItems?: Vehicle[];
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ cartItems = [] }) => {
  const [paymentMethod, setPaymentMethod] = useState("partialPayment");
  const navigate = useNavigate();

  const paymentInfo = useMemo(() => {
  let rent = 0;
  let deposit = 0;

  for (const item of cartItems) {
    rent += item.total || 0;
    deposit += item.deposit || 0;
  }

  return { rent, deposit };
}, [cartItems]);

  const totalToPay =
    paymentMethod === "fullPayment"
      ? paymentInfo.rent + paymentInfo.deposit
      : ((paymentInfo.rent  + paymentInfo.deposit)* 0.2);

  return (
    <div className=" space-y-4 p-4 bg-gray-50 rounded-xl sticky top-0">
      <div
        onClick={() => navigate("/search")}
        className="flex items-center bg-white p-2 rounded-lg shadow-sm cursor-pointer"
      >
        <h2 className="text-sm font-semibold text-customBlue">
          Add Another Vehicle
        </h2>
        <button 
        className="w-7 h-7 rounded-full bg-gray-200 flex justify-center items-center text-customBlue ml-auto">
          +
        </button>
      </div>

      <div className="flex justify-between bg-white p-3 rounded-lg shadow-sm text-sm">
        <p className="font-medium text-xs">
          Total Rent
          <span className="block font-bold text-lg text-customBlue">
            ₹ {paymentInfo.rent}
          </span>
        </p>
        <p className="font-medium text-xs">
          Total Security Deposit
          <span className="block font-bold text-lg text-customBlue">
            ₹ {paymentInfo.deposit}
          </span>
        </p>
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm">
        <h4 className="text-sm font-semibold mb-2">Select Payment Method</h4>
        <div className="flex gap-2">
          <label
            htmlFor="partialPayment"
            className="p-2 rounded-md cursor-pointer font-semibold"
          >
            <input
              type="radio"
              id="partialPayment"
              name="payment"
              value="partialPayment"
              checked={paymentMethod === "partialPayment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Partial Payment
          </label>

          <label
            htmlFor="fullPayment"
            className="p-2 rounded-md cursor-pointer font-semibold"
          >
            <input
              type="radio"
              id="fullPayment"
              name="payment"
              value="fullPayment"
              checked={paymentMethod === "fullPayment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Full Payment
          </label>
        </div>

        <div className="flex items-center mt-2">
          <p className="text-customBlue text-xl font-semibold">
            ₹ {totalToPay.toFixed(0)}
          </p>
          <span className="bg-customBlue text-white ml-2 text-[10px] px-2 rounded-2xl">
            {paymentMethod === "fullPayment" ? " " : "Advance 20% rent"}
          </span>
        </div>
      </div>

      <button className="bg-customBlue text-white text-sm w-full py-1 rounded-2xl">
        Pay ₹{totalToPay.toFixed(0)} and Reserve
      </button>
    </div>
  );
};

export default PaymentInfo;
