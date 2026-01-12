import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import SortBy from "./SortBy";
import Filters from "./Filters";

const Sidebar = ({ filterOpen, toggleFilter, setFilters }) => {
  const { handleSubmit, ...methods } = useForm({
    defaultValues: {
      sortSelected: "hotseller",
      locations: [],
      categories: [],
      makers: [],
    },
  });

  const onSubmit = (data) => {
    setFilters(data);
  };

  useEffect(() => {
    const subscription = methods.watch((values) => {
      setFilters(values);
    });

    return () => subscription.unsubscribe();
  }, [methods, setFilters]);

  return (
    <aside
      className={`font-lufga ${
        filterOpen
          ? "inset-0 fixed top-0 left-0 w-full z-20  animate-filterSlideUp"
          : "hidden"
      } bg-white md:block md:bg-transparent px-4 py-3 md:px-2 md:relative md:z-0 md:w-[25%] lg:w-[20%] `}
    >
      <div className="flex items-center md:hidden">
        <h2 className="text-2xl font-bold">Filters</h2>
        <p
          className="text-4xl font-extralight ml-auto "
          onClick={() => toggleFilter((prev) => !prev)}
        >
          x
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SortBy />
          <Filters />
          <div className="fixed bottom-0 md:relative md:bg-transparent bg-white -mx-4 w-full py-2 md:mx-0 md:my-5">
            <button
              type="submit"
              className="bg-customBlue block font-semibold mx-auto w-[80%] md:w-full text-white py-2 rounded-4xl cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </FormProvider>
    </aside>
  );
};

export default Sidebar;
