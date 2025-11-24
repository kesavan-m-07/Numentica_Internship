import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CitySelect from "./CitySelect";
import DateInput from "./DateInput";
import VehicleTypeSelector from "./VehicleTypeSelector";
import { appState } from "../../../store";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { AppState } from "../../../types";

const HeroSectionForm = () => {
  const navigate = useNavigate();
  const selectedLocation = appState((state: AppState) => state.selectedLocation);
  const { isAuthenticated } = useAuth();
  
  const methods = useForm({
    defaultValues: {
      vehicle: "bike",
      city: selectedLocation,
    },
  });

  const { handleSubmit, reset } = methods;
  
  useEffect(() => {
    reset({
      vehicle: "bike",
      city: selectedLocation,
    });
  }, [selectedLocation, reset]);

  const onSubmit = () => {
    console.log("isAuth", isAuthenticated);
    
    if (!isAuthenticated) return navigate('/auth/login');
    reset();
    return navigate('search');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-[80%] lg:w-[90%]  space-y-3 md:space-y-8 mt-5"
      >
        <VehicleTypeSelector />
        <CitySelect />
        <DateInput />
        <button
          type="submit"
          className="bg-[#2563ea] cursor-pointer text-white p-3 rounded-3xl mt-3 text-sm font-semibold hover:bg-blue-700 transition w-full"
        >
          Search All
        </button>
      </form>
    </FormProvider>
  );
};

export default HeroSectionForm;
