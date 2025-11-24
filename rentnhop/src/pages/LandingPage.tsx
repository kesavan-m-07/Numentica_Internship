import HeroSection from "../components/landingpage/herosection/HeroSection";
import HotSellers from "../components/landingpage/hotseller/HotSellers";
import ServiceBanner from "../components/landingpage/servicesbanner/ServiceBanner";
import InfoCards from "../components/landingpage/infocards/InfoCards";
import BookingSteps from "../components/landingpage/bookingsteps/BookingSteps";
import TopCities from "../components/landingpage/topcities/TopCities";
import AboutUs from "../components/landingpage/aboutus/AboutUs";
import PopularPlaces from "../components/landingpage/popularplaces/PopularPlaces";
import Testimonials from "../components/landingpage/testimonials/Testimonials";
import FaqSection from "../components/landingpage/faqs/FaqSection";

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
