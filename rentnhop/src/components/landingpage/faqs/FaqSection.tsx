import React, { useState } from "react";
import bikeImgSource from "/faqBike.webp";
import svgIcons from "../../../icons/svgIcons";

const FaqSection = () => {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const faqs = [
    {
      header: "Is a bike on rent available at Karol Bagh?",
      content:
        "Renting a bike at Karol Bagh with Rentnhop is super convenient! We have pickup spots at Karol Bagh, so you can start your ride right after you arrive. Whether you’re looking for a sporty ride or something more comfortable, our bike on rent in Delhi options have got you covered. With Delhi motorcycle rental services, you can explore the city hassle-free, making your journey smooth and enjoyable. Our bike on rental in Delhi lineup includes a wide range of choices to suit your travel needs. Plus, our 24/7 customer service is always available to help with your bike rental in Delhi.",
    },
    {
      header: "What if I return my bike late?",
      content:
        "We get it—life happens, and sometimes things don't go exactly as planned. If you find yourself returning your bike a little later than scheduled, no worries. Just a heads up, though—a late fee might be added, depending on how late you are. At Rentnhop, we’re all about making bikes on rent in delhi as smooth and convenient as possible. But to keep things running smoothly, it's really important to return the bike on time so you can avoid any extra charges. We’ve got a 24/7 assistance team that's always ready to help with any bike rental in delhi or scooty on rent in delhi questions or concerns you might have. Whether it’s a quick query or something more, we’re here to make sure your rental scooty in Delhi experience is top-notch.",
    },
    {
      header: "Is a bike on rent available at Karol Bagh?",
      content:
        "Renting a bike at Karol Bagh with Rentnhop is super convenient! We have pickup spots at Karol Bagh, so you can start your ride right after you arrive. Whether you’re looking for a sporty ride or something more comfortable, our bike on rent in Delhi options have got you covered. With Delhi motorcycle rental services, you can explore the city hassle-free, making your journey smooth and enjoyable. Our bike on rental in Delhi lineup includes a wide range of choices to suit your travel needs. Plus, our 24/7 customer service is always available to help with your bike rental in Delhi.",
    },
    {
      header: "What if I return my bike late?",
      content:
        "We get it—life happens, and sometimes things don't go exactly as planned. If you find yourself returning your bike a little later than scheduled, no worries. Just a heads up, though—a late fee might be added, depending on how late you are. At Rentnhop, we’re all about making bikes on rent in delhi as smooth and convenient as possible. But to keep things running smoothly, it's really important to return the bike on time so you can avoid any extra charges. We’ve got a 24/7 assistance team that's always ready to help with any bike rental in delhi or scooty on rent in delhi questions or concerns you might have. Whether it’s a quick query or something more, we’re here to make sure your rental scooty in Delhi experience is top-notch.",
    },
    {
      header: "Is a bike on rent available at Karol Bagh?",
      content:
        "Renting a bike at Karol Bagh with Rentnhop is super convenient! We have pickup spots at Karol Bagh, so you can start your ride right after you arrive. Whether you’re looking for a sporty ride or something more comfortable, our bike on rent in Delhi options have got you covered. With Delhi motorcycle rental services, you can explore the city hassle-free, making your journey smooth and enjoyable. Our bike on rental in Delhi lineup includes a wide range of choices to suit your travel needs. Plus, our 24/7 customer service is always available to help with your bike rental in Delhi.",
    },
    {
      header: "What if I return my bike late?",
      content:
        "We get it—life happens, and sometimes things don't go exactly as planned. If you find yourself returning your bike a little later than scheduled, no worries. Just a heads up, though—a late fee might be added, depending on how late you are. At Rentnhop, we’re all about making bikes on rent in delhi as smooth and convenient as possible. But to keep things running smoothly, it's really important to return the bike on time so you can avoid any extra charges. We’ve got a 24/7 assistance team that's always ready to help with any bike rental in delhi or scooty on rent in delhi questions or concerns you might have. Whether it’s a quick query or something more, we’re here to make sure your rental scooty in Delhi experience is top-notch.",
    },
    {
      header: "Is a bike on rent available at Karol Bagh?",
      content:
        "Renting a bike at Karol Bagh with Rentnhop is super convenient! We have pickup spots at Karol Bagh, so you can start your ride right after you arrive. Whether you’re looking for a sporty ride or something more comfortable, our bike on rent in Delhi options have got you covered. With Delhi motorcycle rental services, you can explore the city hassle-free, making your journey smooth and enjoyable. Our bike on rental in Delhi lineup includes a wide range of choices to suit your travel needs. Plus, our 24/7 customer service is always available to help with your bike rental in Delhi.",
    },
    {
      header: "What if I return my bike late?",
      content:
        "We get it—life happens, and sometimes things don't go exactly as planned. If you find yourself returning your bike a little later than scheduled, no worries. Just a heads up, though—a late fee might be added, depending on how late you are. At Rentnhop, we’re all about making bikes on rent in delhi as smooth and convenient as possible. But to keep things running smoothly, it's really important to return the bike on time so you can avoid any extra charges. We’ve got a 24/7 assistance team that's always ready to help with any bike rental in delhi or scooty on rent in delhi questions or concerns you might have. Whether it’s a quick query or something more, we’re here to make sure your rental scooty in Delhi experience is top-notch.",
    },
    {
      header: "Is a bike on rent available at Karol Bagh?",
      content:
        "Renting a bike at Karol Bagh with Rentnhop is super convenient! We have pickup spots at Karol Bagh, so you can start your ride right after you arrive. Whether you’re looking for a sporty ride or something more comfortable, our bike on rent in Delhi options have got you covered. With Delhi motorcycle rental services, you can explore the city hassle-free, making your journey smooth and enjoyable. Our bike on rental in Delhi lineup includes a wide range of choices to suit your travel needs. Plus, our 24/7 customer service is always available to help with your bike rental in Delhi.",
    },
    {
      header: "What if I return my bike late?",
      content:
        "We get it—life happens, and sometimes things don't go exactly as planned. If you find yourself returning your bike a little later than scheduled, no worries. Just a heads up, though—a late fee might be added, depending on how late you are. At Rentnhop, we’re all about making bikes on rent in delhi as smooth and convenient as possible. But to keep things running smoothly, it's really important to return the bike on time so you can avoid any extra charges. We’ve got a 24/7 assistance team that's always ready to help with any bike rental in delhi or scooty on rent in delhi questions or concerns you might have. Whether it’s a quick query or something more, we’re here to make sure your rental scooty in Delhi experience is top-notch.",
    },
  ];
  return (
    <section className='py-10 bg-[url("/faqbg.png")] bg-contain no bg-no-repeat  md:px-4'>
      <p className="text-customBlue text-base font-bold text-center ">FAQS</p>
      <h2 className="text-3xl lg:text-5xl text-center font-bold mt-1">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row">
        <img src={bikeImgSource} alt="Bike png" className="md:w-1/2 h-max" />
        <div className="">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="px-3 py-5 border-b border-gray-200 cursor-pointer group"
              onClick={() => setOpenedIndex((prev) => (prev == i ? null : i))}
            >
              <div
                className={`flex items-center group-hover:underline ${
                  openedIndex === i ? "text-customBlue underline" : ""
                }`}
              >
                <p className="font-bold">{faq.header}</p>
                <span
                  className={`${
                    openedIndex === i ? "rotate-180" : ""
                  } ml-auto transition-all duration-200 text-grey-400`}
                >
                  {svgIcons.dropDown(20)}
                </span>
              </div>
              <p
                className={`transition-all duration-200 ease-in ${
                  openedIndex === i ? "max-h-72 mt-5" : "max-h-0"
                } overflow-hidden text-sm/7`}
              >
                {faq.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
