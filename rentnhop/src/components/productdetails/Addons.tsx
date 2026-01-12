import React, { useState } from "react";

const addons = [
  {
    id: 1,
    name: "Helmet",
    pricePerDay: 0,
    description: "Complimentary helmet",
    imagePath: "/helmet.avif",
  },
  {
    id: 2,
    name: "Helmet",
    pricePerDay: 50,
    description: "Pillion helmet",
    imagePath: "/helmet.avif",
  },
  {
    id: 3,
    name: "Half Kit",
    pricePerDay: 150,
    description: "Gloves, Elbow & Knee guards",
    imagePath: "/half-kit.avif",
  },
  {
    id: 4,
    name: "Full Kit",
    pricePerDay: 300,
    description: "Riding Jacket, gloves, elbow & knee guards",
    imagePath: "/full-kit.avif",
  },
  {
    id: 5,
    name: "Luggage carrier",
    pricePerDay: 50,
    description: "Only with Royal Enfield",
    imagePath: "/luggage-carrier.avif",
  },
  {
    id: 6,
    name: "Extra kilometers (100km) ",
    pricePerDay: 800,
    description: "In total limit, 100km will be added",
    imagePath: "/extra-km.avif",
  },
];

interface AddonsProps {
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Addons: React.FC<AddonsProps> = ({ setPrice }) => {
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

  const handleToggle = (id: number, addonPrice: number) => {
    const isSelected = selectedAddons.includes(id);

    if (isSelected) {
      setSelectedAddons((prev) => prev.filter((addonId) => addonId !== id));
      setPrice((prev) => prev - addonPrice);
    } else {
      setSelectedAddons((prev) => [...prev, id]);
      setPrice((prev) => prev + addonPrice);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-lg ml-3 mt-5 mb-4">Available Add Ons</h2>
      <div className="mx-3 ">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className="flex items-center justify-between gap-5 my-3"
          >
            <div className="w-15 h-15 bg-gradient-to-b from-[#0056F1]/20 to-white/0 p-2 rounded-2xl">
              <img
                src={addon.imagePath}
                alt="add on image"
                className="w-full h-full"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold">
                {addon.name} -{" "}
                {addon.pricePerDay === 0
                  ? "Free"
                  : `₹ ${addon.pricePerDay}/day`}
              </p>
              <p className="text-xs text-gray-500">{addon.description}</p>
            </div>
            <input
              type="checkbox"
              checked={selectedAddons.includes(addon.id)}
              onChange={() => handleToggle(addon.id, addon.pricePerDay)}
              className="appearance-none relative w-10 h-5 bg-gray-300 rounded-full
             checked:bg-blue-500 transition-colors duration-300
             before:content-[''] before:absolute before:top-[2px] before:left-[2px]
             before:w-4 before:h-4 before:bg-white before:rounded-full
             before:transition-all before:duration-300
             checked:before:translate-x-5 cursor-pointer ml-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addons;
