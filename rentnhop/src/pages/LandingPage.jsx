import React from "react";
import HeroSection from "../components/landing-page-components/hero-section/HeroSection";
import HotSellers from "../components/landing-page-components/hot-seller-section/HotSellers";
import ServiceBanner from "../components/landing-page-components/services-banner/ServiceBanner";
import InfoCards from "../components/landing-page-components/info-cards-section/InfoCards";
import BookingSteps from "../components/landing-page-components/booking-steps/BookingSteps";
import TopCities from "../components/landing-page-components/top-cities/TopCities";
import AboutUs from "../components/landing-page-components/about-us/AboutUs";
import PopularPlaces from "../components/landing-page-components/popular-places/PopularPlaces";
import Testimonials from "../components/landing-page-components/testimonials/Testimonials";
import FaqSection from "../components/landing-page-components/faqs/FaqSection";

const LandingPage = () => {
  return (
    <section>
      <HeroSection />
      <HotSellers />
      <ServiceBanner />
      <InfoCards />
      <BookingSteps />
      <TopCities />
      <AboutUs />
      <PopularPlaces />
      <Testimonials />
      <FaqSection />
    </section>
  );
};

export default LandingPage;
