import { Routes, Route, Link } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./components/landing-page-components/about-us/AboutUs";
import SearchResult from "./pages/SearchResult";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import CartPage from "./pages/CartPage";
import "./globals.css";
import Login from "./pages/Login";
import RegisterForm from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import { useUser } from "./custom-hooks/useUser";

function App() {
  const {isLoading} = useUser();
  if(isLoading) return <p>Loading Session...</p>

  return (
    
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="vehicle-detail/:vehicleId" element={<VehicleDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
   
  );
}

export default App;
