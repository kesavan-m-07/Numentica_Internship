import React, { useEffect, useMemo } from "react";
import { appState } from "../store";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useUserCart } from "../query/useUserCart";
import { parseJsonCart } from "../utils/BikesUtilities";
import { AppState } from "../types";

const Cart = () => {
  const navigate = useNavigate();
  const cartCount = appState((state: AppState) => state.cartCount);
  const setCartCount = appState((state: AppState) => state.setCartCount);

  const { user, isAuthenticated } = useAuth();

  const { data: cart } = useUserCart(user);

  const parsedCart = useMemo(() => {
    if (!cart) return [];
    return parseJsonCart(cart?.rows[0]?.CartItems);
  }, [cart]);

  useEffect(() => {
    if (!isAuthenticated) {
      setCartCount(0);
      return;
    }

    setCartCount(parsedCart.length);
  }, [isAuthenticated, parsedCart, setCartCount]);

  return (
    <div
      onClick={() => navigate("/cart")}
      className="flex items-center cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
      >
        <path
          fill="#242424"
          d="M16.25 3.125h-3.188a3.125 3.125 0 0 0-6.124 0H3.75a.625.625 0 0 0 0 1.25h3.188c.135.66.48 1.257.982 1.705A5.006 5.006 0 0 0 5 10.625v5a1.25 1.25 0 0 0 1.25 1.25H7.5a2.5 2.5 0 0 0 5 0h1.25a1.25 1.25 0 0 0 1.25-1.25v-5a5.007 5.007 0 0 0-2.92-4.545 3.125 3.125 0 0 0 .982-1.705h3.188a.625.625 0 1 0 0-1.25Zm-5 13.75a1.25 1.25 0 0 1-2.5 0v-3.75a1.25 1.25 0 0 1 2.5 0v3.75Zm2.5-6.25v5H12.5v-2.5a2.5 2.5 0 0 0-5 0v2.5H6.25v-5a3.75 3.75 0 1 1 7.5 0ZM8.125 3.75a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
          style={{
            fill: "color(display-p3 .1412 .1412 .1412)",
            fillOpacity: 1,
          }}
        />
      </svg>
      <p className=" hidden lg:block text-sm">Cart</p>
      <div className="w-4 h-4 flex justify-center items-center rounded-full bg-[#002040] text-xs text-white md:ml-1">
        {cartCount}
      </div>
    </div>
  );
};

export default Cart;
