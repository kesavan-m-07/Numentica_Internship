import { useUser } from "./useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Query } from "appwrite";
import {
  userCartId,
  databaseId,
  databases,
  citybikeInfo,
} from "../app-write-files/AppWriteAccount";

export const useUserCartUpdate = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async ({ selectedVehicle, areaVehicleList }) => {
        console.log("SelectedVehicle: ",selectedVehicle);
        
      if (!user) throw new Error("User not found");
      if (!selectedVehicle || !areaVehicleList)
        throw new Error("Invalid input");

      const bikesToUpdate = areaVehicleList
        .filter((v) => v.status === "available")
        .slice(0, selectedVehicle.vehicleCount);

        console.log("BikesToUpdate:",bikesToUpdate);
        
      if (bikesToUpdate.length === 0)
        throw new Error("No available vehicles in this area");

      await Promise.all(
        bikesToUpdate.map((bike) =>
          databases.updateRow({
            databaseId,
            tableId: citybikeInfo,
            rowId: bike.$id,
            data: { status: "incart" },
          })
        )
      );

      const cartDocs = await databases.listRows({
        databaseId,
        tableId: userCartId,
        queries: [Query.equal("userId", user.$id)],
      });

      let cartDoc = cartDocs.rows?.[0];
      let existingCart = [];

      existingCart = (cartDoc.CartItems || []).map((item) =>
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
          total:selectedVehicle.totalPrice,
          deposit:selectedVehicle.securityDeposit,
          duration:selectedVehicle.difference,
        });
      }

      

      await databases.updateRow({
        databaseId,
        tableId: userCartId,
        rowId: cartDoc.$id,
        data: {
          CartItems: existingCart.map((item) =>
            typeof item === "string" ? item : JSON.stringify(item)
          ),
        },
      });

      return existingCart;
    },

    onSuccess: (data) => {
      console.log("Cart updated successfully:", data);
      queryClient.invalidateQueries(["user-cart"]);
    },

    onError: (err) => {
      console.error("Failed to update cart:", err.message);
    },
  });
};
