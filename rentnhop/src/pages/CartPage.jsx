import React, { useEffect, useState } from "react";
import { appState } from "../store";
import CartItemInfo from "../components/cart-page/cartItemInfo";
import PaymentInfo from "./PaymentInfo";
import { useUser } from "../custom-hooks/useUser";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  databases,
  userCartId,
  databaseId,
} from "../app-write-files/AppWriteAccount";
import { Query } from "appwrite";

const CartPage = () => {
  const navigate = useNavigate(); 
  const setCartCount = appState(state=>state.setCartCount);
  const { data: user, isError } = useUser();
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    if (isError || !user) {
      navigate("/auth/login");
    }
  }, [isError, user, navigate]);

  const { data: cartinfo, isLoading } = useQuery({
    queryKey: ["user-cart", user?.$id],
    queryFn: async () => {
      const res = await databases.listRows({
        databaseId,
        tableId: userCartId,
        queries: [Query.equal("userId", user.$id)],
      });
      return res.rows[0];
    },
    enabled: !!user?.$id,
    staleTime: 1000 * 60 * 5,
  });


  useEffect(() => {
    if (cartinfo?.CartItems) {
      const parsedItems = cartinfo.CartItems.map((item) =>
        typeof item === "string" ? JSON.parse(item) : item
      );
      setCartItems(parsedItems);
      setCartCount(cartItems?.length)
    } else {
      setCartItems([]);
    }
  }, [cartItems?.length, cartinfo, setCartCount]);

  if (isLoading) return <p>Loading your cart...</p>;

  if (!cartItems || cartItems.length === 0) {
    return (
      <section className="p-6 text-center font-lufga bg-[#F5FAFF] min-h-screen">
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
      <div className="font-lufga p-3 bg-[#F5FAFF] md:flex">
        <div className="h-[calc(100vh-80px)] overflow-y-scroll no-scrollbar basis-[70%] px-2">
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
