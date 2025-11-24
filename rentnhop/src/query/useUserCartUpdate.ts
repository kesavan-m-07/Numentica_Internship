import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userCartId,
  databaseId,
  databases,
  citybikeInfo,
} from "../appwrite/AppWriteAccount";
import { getUserCart } from "../utils/BikesUtilities";

import { appState } from "../store";
import { BikeInstance } from "../types";

interface SelectedVehicleForCart {
  bike_slug: string;
  area_slug: string;
  vehicleCount: number;
  pricePerDay: number;
  formattedPickUpDate: string[];
  formattedReturnDate: string[];
  totalPrice: number;
  securityDeposit: number;
  difference: { day: number; hours: number };
}

interface CartItem {
  bikeSlug: string;
  areaSlug: string;
  quantity: number;
  vehicles: string[];
  pricePerDay: number;
  pickupDate: string[];
  returnDate: string[];
  total: number;
  deposit: number;
  duration: { day: number; hours: number };
}

export const useUserCartUpdate = () => {
  const queryClient = useQueryClient();
  const user = appState((state) => state.user);

  return useMutation({
    mutationFn: async ({ selectedVehicle, areaVehicleList }: { selectedVehicle: SelectedVehicleForCart; areaVehicleList: BikeInstance[] }) => {
      if (!user) throw new Error("User not found");
      if (!selectedVehicle || !areaVehicleList)
        throw new Error("Invalid input");

      const bikesToUpdate = areaVehicleList
        .filter((v) => v.status === "available")
        .slice(0, selectedVehicle.vehicleCount);

      console.log("BikesToUpdate:", bikesToUpdate);

      if (bikesToUpdate.length === 0)
        throw new Error("No available vehicles in this area");

      await Promise.all(
        bikesToUpdate.map((bike) =>
          databases.updateRow(
            databaseId,
            citybikeInfo,
            bike.$id,
            { status: "incart" }
          )
        )
      );

      const cartDocs = await getUserCart(user);
      const cartDoc = cartDocs.rows?.[0];
      let existingCart: CartItem[] = [];

      existingCart = (cartDoc.CartItems || []).map((item: string | CartItem) =>
        typeof item === "string" ? JSON.parse(item) : item
      );

      const existingIndex = existingCart.findIndex(
        (item) =>
          item.bikeSlug === selectedVehicle.bike_slug &&
          item.areaSlug === selectedVehicle.area_slug
      );

      if (existingIndex !== -1) {
        existingCart[existingIndex].quantity += bikesToUpdate.length;
        existingCart[existingIndex].vehicles.push(
          ...bikesToUpdate.map((v) => v.$id)
        );
      } else {
        existingCart.push({
          bikeSlug: selectedVehicle.bike_slug,
          areaSlug: selectedVehicle.area_slug,
          quantity: bikesToUpdate.length,
          vehicles: bikesToUpdate.map((v) => v.$id),
          pricePerDay: selectedVehicle.pricePerDay,
          pickupDate: selectedVehicle.formattedPickUpDate,
          returnDate: selectedVehicle.formattedReturnDate,
          total: selectedVehicle.totalPrice,
          deposit: selectedVehicle.securityDeposit,
          duration: selectedVehicle.difference,
        });
      }

      await databases.updateRow(
        databaseId,
        userCartId,
        cartDoc.$id,
        {
          CartItems: existingCart.map((item) =>
            typeof item === "string" ? item : JSON.stringify(item)
          ),
        }
      );

      return existingCart;
    },

    onSuccess: (data) => {
      console.log("Cart updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["user-cart", user?.$id] });
    },

    onError: (err: Error) => {
      console.error("Failed to update cart:", err.message);
    },
  });
};
