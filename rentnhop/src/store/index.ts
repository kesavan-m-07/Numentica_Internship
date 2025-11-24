import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { AppState } from "../types";

import selectedLocationState from "./SelectedLocationState";
import dayDifference from "./dayDiffrence";
import { cartState } from "./cartState";
import { selectedVehicle } from "./SelectedVehicle";
import { dateState } from "./dateState";
import { userInfo } from "./userInfo";
import { sortSelected } from "./selectedSortingValue";

export const appState = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ...selectedLocationState(set),
        ...dayDifference(set),
        ...cartState(set),
        ...selectedVehicle(set),
        ...dateState(set),
        ...userInfo(set),
        ...sortSelected(set)
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          selectedLocation: state.selectedLocation,
          difference: state.difference,
          cartCount: state.cartCount,
          selectedVehicle: state.selectedVehicle,
          pickupDate: state.pickupDate,
          returnDate: state.returnDate,
          user: state.user,
          selectedSort: state.selectedSort,
        }),
      }
    ),
    { name: "AppState Store", enabled: true }
  )
);
