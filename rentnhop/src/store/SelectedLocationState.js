const selectedLocation = (set, get) => ({
  selectedLocation: "chennai",
  updateLocation: (location) => set({ selectedLocation: location }),
  getLocation: get(selectedLocation),
});

export default selectedLocation;
