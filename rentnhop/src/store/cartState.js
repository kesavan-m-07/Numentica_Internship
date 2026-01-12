export const cartState = (set) => ({
  cartCount: 0,
  
  setCartCount: (count) =>
    set((state) => ({
      cartCount : count,
    })),

  currentVehicle: null,
  setCurrentVehicle: (data) => set({ currentVehicle: data }),
});
