import { SelectedLocationState } from "../types";

const selectedLocation = (set: (fn: (state: SelectedLocationState) => Partial<SelectedLocationState>) => void): SelectedLocationState => ({
  selectedLocation: "chennai",
  updateLocation: (location: string) => set(() => ({ selectedLocation: location })),
});

export default selectedLocation;
