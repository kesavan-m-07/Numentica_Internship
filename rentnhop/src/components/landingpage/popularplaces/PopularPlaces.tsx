import React, { useState } from "react";
import svgIcons from "../../../icons/svgIcons";

const accordions = [
  [
    {
      header: "City Adventures / Local Getaways",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet laudantium reprehenderit quisquam aliquid quo quasi nisi a commodi fuga voluptates ipsa laborum, similique, ex tenetur cum sit distinctio. Velit!",
    },
    {
      header: "Student Routes",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet laudantium reprehenderit quisquam aliquid quo quasi nisi a commodi fuga voluptates ipsa laborum, similique, ex tenetur cum sit distinctio. Velit!",
    },
  ],
  [
    {
      header: "Close-by Trips / Short Haul Adventures",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet laudantium reprehenderit quisquam aliquid quo quasi nisi a commodi fuga voluptates ipsa laborum, similique, ex tenetur cum sit distinctio. Velit!",
    },
    {
      header: "Best Foodie Trails in the city",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet laudantium reprehenderit quisquam aliquid quo quasi nisi a commodi fuga voluptates ipsa laborum, similique, ex tenetur cum sit distinctio. Velit!",
    },
  ],
  [
    {
      header: "Close-by Trips / Short Haul Adventures",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet laudantium reprehenderit quisquam aliquid quo quasi nisi a commodi fuga voluptates ipsa laborum, similique, ex tenetur cum sit distinctio. Velit!",
    },
    {
      header: "Best Foodie Trails in the city",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet laudantium reprehenderit quisquam aliquid quo quasi nisi a commodi fuga voluptates ipsa laborum, similique, ex tenetur cum sit distinctio. Velit!",
    },
  ],
];

const PopularPlaces = () => {
  const [accordionState, setAccordionState] = useState<{ [key: number]: number | null }>({ 0: null, 1: null });

  const toggleAccordion = (colIndex: number, i: number) => {
    setAccordionState((prev) => ({
      ...prev,
      [colIndex]: prev[colIndex] === i ? null : i,
    }));
  };

  return (
    <section className=" py-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        Popular Places to Visit
      </h2>

      <div className="flex flex-col md:flex-row gap-4 px-3">
        {accordions.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col w-full md:w-1/2 gap-5">
            {column.map((accordion, i) => {
              const isOpen = accordionState[colIndex] === i;

              return (
                <div
                  key={i}
                  onClick={() => toggleAccordion(colIndex, i)}
                  className="p-4 border border-gray-500 rounded-lg group cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-end">
                    <p className="text-lg font-semibold group-hover:underline">
                      {accordion.header}
                    </p>
                    <span
                      className={`ml-auto transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      {svgIcons.dropDown(24, "text-gray-700 ")}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {accordion.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPlaces;
