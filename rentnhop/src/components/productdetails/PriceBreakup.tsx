import React from 'react'

interface PriceBreakupProps {
  breakUpOpen: boolean;
  price: number;
  deposit: number;
}

const PriceBreakup: React.FC<PriceBreakupProps> = ({breakUpOpen,price,deposit}) => {
  
  return (
     <div
        className={`${
          breakUpOpen ? "max-h-[1000px]" : "max-h-0"
        } transition-all duration-300 overflow-hidden ease-in-out mt-5 space-y-2`}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">Total Rent </p>
          <span className="font-semibold">₹ {price}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">Rent payable</p>
          <span className="font-semibold">₹ {price}</span>
        </div>
        <hr className="border my-2 border-gray-300" />
        <div className="flex justify-between items-center py-2">
          <p className="text-customBlue font-semibold text-sm">Booking Advance to pay now <span className="block text-xs text-gray-500">20% of the Total rent</span></p>
          <span className="text-customBlue font-semibold">₹ {Math.ceil(price * 0.2)}</span>
        </div>
        <hr className="border my-2 border-gray-300" />
        <div className="flex justify-between items-center py-2">
          <p className="text-amber-600 font-semibold text-sm">Balance to be paid at Pickup <span className="block text-xs text-gray-500">80% of the Total rent</span></p>
          <span className="text-amber-600 font-semibold">₹ {Math.ceil(price * 0.8)}</span>
        </div>
        <hr className="border my-2 border-gray-300" />
        <div className="flex justify-between items-center py-2">
          <p className="text-green-700 font-semibold text-sm">Refundable Security Deposit<span className="block text-xs text-gray-500">To be paid at Pick up</span></p>
          <span className="text-green-700 font-semibold">₹ {deposit}</span>
        </div>
      </div>
  )
}

export default PriceBreakup
