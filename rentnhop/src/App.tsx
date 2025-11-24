import React from "react";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./components/landingpage/aboutus/AboutUs";
import SearchResult from "./pages/SearchResult";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import RegisterForm from "./pages/Register";
import FaqSection from "./components/landingpage/faqs/FaqSection";
import { useUserSession } from "./query/useUserSession";
import ProtectedRoute from "./components/ProtectedRoute";
import "./globals.css";

function App() {
  useUserSession();

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="faqs" element={<FaqSection />} />
          <Route element={<ProtectedRoute />}>
            <Route path="search" element={<SearchResult />} />
            <Route
              path="vehicle-detail/:vehicleId"
              element={<VehicleDetailsPage />}
            />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
