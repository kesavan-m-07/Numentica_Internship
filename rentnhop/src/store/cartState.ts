import { CartState } from "../types";

export const cartState = (set: (fn: (state: CartState) => Partial<CartState>) => void): CartState => ({
  cartCount: 0,

  setCartCount: (count: number) =>
    set(() => ({
      cartCount: count,
    })),
});
