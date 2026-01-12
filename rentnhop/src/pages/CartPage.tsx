import { useEffect, useState } from "react";
import { appState } from "../store";
import CartItemInfo from "../components/cartpage/CartItemInfo";
import PaymentInfo from "./PaymentInfo";
import { useAuth } from "../hooks/useAuth";
import Loader from "../dumb-components/Loader";
import { parseJsonCart } from "../utils/BikesUtilities";
import { useUserCart } from "../query/useUserCart";
import { AppState } from "../types";

const CartPage = () => {
  const setCartCount = appState((state: AppState) => state.setCartCount);
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const { data: cartinfo, isLoading } = useUserCart(user);
  
  
  useEffect(() => {
  if (cartinfo?.rows[0]?.CartItems) {
    const parsedItems = parseJsonCart(cartinfo.rows[0].CartItems);
    setCartItems(parsedItems);           
    setCartCount(parsedItems.length);  
  } else {
    setCartItems([]);
    setCartCount(0);
  }
}, [cartinfo, setCartCount]);

  if (isLoading) return <Loader text={"Loading Your Cart"} />;

  if ((!isLoading && !cartItems) || cartItems.length === 0) {
    return (
      <section className="p-6 text-center  bg-[#F5FAFF] min-h-screen">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty 🛒</h2>
        <p className="text-gray-500">Add some vehicles to continue.</p>
      </section>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-semibold bg-[#F5FAFF] px-5 py-3">
        Cart ({cartItems?.length})
      </h2>
      <div className=" p-3 bg-[#F5FAFF] md:flex">
        <div className="overflow-y-scroll no-scrollbar basis-[70%] px-2">
          {cartItems.map((vehicle, i) => (
            <CartItemInfo key={i} vehicle={vehicle} />
          ))}
        </div>
        <div className="sticky top-0 basis-[30%]">
          <PaymentInfo cartItems={cartItems} />
        </div>
      </div>
    </>
  );
};

export default CartPage;
