import { DateState } from "../types";

export const dateState = (set: (fn: (state: DateState) => Partial<DateState>) => void): DateState => ({
  pickupDate: null,
  returnDate: null,
  setPickupDate: (date: string) => {
    set(() => ({ pickupDate: date }));
  },
  setReturnDate: (date: string) => {
    set(() => ({ returnDate: date }));
  },
});
