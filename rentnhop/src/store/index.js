import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import selectedLocationState from "./SelectedLocationState";
import dayDifference from "./dayDiffrence";
import { cartState } from "./cartState";
import { selectedVehicle } from "./SelectedVehicle";
import { dateState } from "./dateState";
import { userInfo } from "./userInfo";
import { sortSelected } from "./selectedSortingValue";

export const appState = create(
  devtools(
    persist(
      (set, get) => ({
        ...selectedLocationState(set, get),
        ...dayDifference(set, get),
        ...cartState(set, get),
        ...selectedVehicle(set, get),
        ...dateState(set, get),
        ...userInfo(set,get),
        ...sortSelected(set,get)
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          selectedLocation: state.selectedLocation,
          difference: state.difference,
          cartCount: state.cartCount,
          cartItems: state.cartItems,
          selectedVehicle: state.selectedVehicle,
          pickupDate: state.pickupDate,
          returnDate: state.returnDate,
          user: state.user,
        }),
      }
    ),
    { name: "AppState Store", enabled: true }
  )
);


