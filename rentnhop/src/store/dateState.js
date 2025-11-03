export const dateState = (set ) => ({
  pickupDate: null,
  returnDate: null,
  setPickupDate: (date) => {
    set({ pickupDate: date });
  },
  setReturnDate: (date) => {
    set({ returnDate: date });
  },
});
