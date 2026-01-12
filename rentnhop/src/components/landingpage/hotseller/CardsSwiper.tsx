import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

const bikeCards = [
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
  { name: "Activa 5g", imagePath: "/activa-5g.webp" },
];
const CardSwiper = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth()

  const handleClick = () => {
    if(!isAuthenticated){
      return navigate('/auth/login')
    }
    return navigate('/search')
  };

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        slidesPerGroup={1}
        pagination={{ el: ".cards-pagination", clickable: true }}
        grabCursor={false}
        centerInsufficientSlides={true}
        breakpoints={{
          640: { slidesPerView: 1.5, slidesPerGroup: 1 },
          768: { slidesPerView: 2.2, slidesPerGroup: 2 },
          1025: { slidesPerView: 4.2, slidesPerGroup: 4 },
        }}
        modules={[Pagination]}
        className=""
      >
        {bikeCards.map((bike, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white shadow-[0_0_10px__rgba(0,0,0,.3)] p-6 m-3 rounded-3xl text-center min-w-68">
              <img
                src={bike.imagePath}
                loading="lazy"
                alt="bike image"
                className="mb-10 mt-3"
              />
              <h3 className="font-semibold text-sm md:text-2xl">{bike.name}</h3>
              <button
                onClick={handleClick}
                className="w-max bg-black py-2 px-7 my-3 text-white font-semibold rounded-3xl cursor-pointer hover:bg-customBlue"
              >
                Book Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="cards-pagination text-center "></div>
    </>
  );
};

export default CardSwiper;
