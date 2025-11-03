import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const reviewers = [
  {
    profileImage: "/profile1.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/google.webp",
  },
  {
    profileImage: "/profile2.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/tripadvisor.webp",
  },
  {
    profileImage: "/profile1.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/google.webp",
  },
  {
    profileImage: "/profile2.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/tripadvisor.webp",
  },
  {
    profileImage: "/profile1.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/google.webp",
  },
  {
    profileImage: "/profile2.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/tripadvisor.webp",
  },
  {
    profileImage: "/profile1.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/google.webp",
  },
  {
    profileImage: "/profile2.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/tripadvisor.webp",
  },
  {
    profileImage: "/profile1.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/google.webp",
  },
  {
    profileImage: "/profile2.webp",
    name: "Gaurav Chechani  ",
    reviewContent:
      "Best service provided, booking so convenient and easy. We booked bike Himalayan for 9 days and went to Uttarakhand in rainy season.",
    reviewCount: 156,
    platform: "/tripadvisor.webp",
  },
];
const Testimonials = () => {

  return (
    <section className="py-15 bg-[#061C34] px-3 lg:px-6 font-lufga">
      <p className="font-bold text-center text-white">Testimonials</p>
      <h3 className="text-center text-3xl md:text-5xl font-bold text-white mt-4">
        What riders say
      </h3>
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        slidesPerGroup={1}
        
        pagination={{ el: ".pagination-testimonials", clickable: true }}
        grabCursor={false}
        centerInsufficientSlides={true}
        breakpoints={{
          640: { slidesPerView: 1.5, slidesPerGroup: 1 },
          768: { slidesPerView: 2.1, slidesPerGroup: 2 },
          1025: { slidesPerView: 3.2, slidesPerGroup: 3 },
        }}
        modules={[Pagination]}
        className="mt-10 overflow-visible py-20"
      >
        {reviewers.map((reviewer, i) => (
          <SwiperSlide key={i} className="overflow-visible">
            <div className="bg-white rounded-2xl space-y-2 text-center pb-15 hover:scale-101 z-10 transition duration-200">
              <div className="w-full h-48 md:h-56 lg:h-45">
                <img src={reviewer.profileImage} alt="Profile Image" className="w-full h-full rounded-t-2xl" />
              </div>
              <h3 className="px-10 text-2xl text-customBlue font-semibold">{reviewer.name}</h3>
              <p className="px-10 text-gray-400 text-sm">{reviewer.reviewCount} reviews</p>
              <p className="px-10 text-sm/6">{reviewer.reviewContent}</p>
              <div className="flex items-end justify-center gap-2 px-10 text-gray-500 text-sm">
                Posted on{" "}
                <img
                  src={reviewer.platform}
                  alt="platform"
                  className="h-5 w-max"
                />
              </div>
            </div>
          </SwiperSlide>
          
        ))}
      </Swiper>
      <div className="pagination-testimonials text-center flex  justify-center items-center mt-6 gap-1"></div>
    </section>
  );
};

export default Testimonials;
