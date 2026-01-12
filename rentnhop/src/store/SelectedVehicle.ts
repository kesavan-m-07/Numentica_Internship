import { Bike, SelectedVehicleState } from "../types";

export const selectedVehicle = (set: (fn: (state: SelectedVehicleState) => Partial<SelectedVehicleState>) => void): SelectedVehicleState => ({
  selectedVehicle: null,
  setVehicle: (vehicle: Bike | null) => set(() => ({ selectedVehicle: vehicle })),
  removeVehicle: () => set(() => ({ selectedVehicle: null })),
});
