import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import {
  databases,
  userCartId,
  databaseId,
  citybikeInfo,
} from "../app-write-files/AppWriteAccount";
import { Query } from "appwrite";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async ({ updatedVehicle, isIncrement }) => {
      if (!user || !updatedVehicle) {
        throw new Error("Missing user or vehicle info");
      }

      const userCartObject = await databases.listRows({
        databaseId,
        tableId: userCartId,
        queries: [Query.equal("userId", user.$id)],
      });

      const cartDoc = userCartObject?.rows?.[0];
      if (!cartDoc) throw new Error("User cart not found");

      const parsedUserCart = Array.isArray(cartDoc.CartItems)
        ? cartDoc.CartItems.map((v) => {
            try {
              return typeof v === "string" ? JSON.parse(v) : v;
            } catch (err) {
              console.error("Bad JSON in CartItems:", v);
              return null;
            }
          }).filter(Boolean)
        : [];

      const currentFocusedVehicle = parsedUserCart.find((v) => {
        if (!v || !Array.isArray(v.pickupDate)) return false;
        return (
          v.areaSlug === updatedVehicle.areaSlug &&
          v.bikeSlug === updatedVehicle.bikeSlug &&
          Array.isArray(updatedVehicle.pickupDate) &&
          v.pickupDate.join() === updatedVehicle.pickupDate.join()
        );
      });

      if (!currentFocusedVehicle) {
        console.warn("No matching vehicle found in user cart");
        return;
      }

      if (isIncrement) {
        const { areaSlug, bikeSlug } = currentFocusedVehicle;

        const availableVehicles = await databases.listRows({
          databaseId,
          tableId: citybikeInfo,
          queries: [
            Query.equal("area_slug", areaSlug),
            Query.equal("bike_slug", bikeSlug),
            Query.equal("status", "available"),
          ],
        });

        const nextBike = availableVehicles.rows?.[0];

        if (!nextBike) throw new Error("No available bikes left!");

        await databases.updateRow({
          databaseId,
          tableId: citybikeInfo,
          rowId: nextBike.$id,
          data: { status: "incart" },
        });

        console.log(currentFocusedVehicle);

        currentFocusedVehicle.vehicles = [
          ...(currentFocusedVehicle.vehicles || []),
          nextBike.$id,
        ];

        currentFocusedVehicle.quantity =
          (currentFocusedVehicle.quantity || 0) + 1;

        currentFocusedVehicle.total =
          currentFocusedVehicle.total +
          currentFocusedVehicle.pricePerDay *
            currentFocusedVehicle.duration.days;
      } else {
        console.log("Decrementing vehicle count...");

        const poppedVehicleId = currentFocusedVehicle.vehicles?.pop();
        if (poppedVehicleId) {
          await databases.updateRow({
            databaseId,
            tableId: citybikeInfo,
            rowId: poppedVehicleId,
            data: { status: "available" },
          });
        }

        currentFocusedVehicle.quantity = Math.max(
          0,
          (currentFocusedVehicle.quantity || 1) - 1
        );

         currentFocusedVehicle.total =
          currentFocusedVehicle.total -
          currentFocusedVehicle.pricePerDay *
            currentFocusedVehicle.duration.days;
      }

      const updatedCart = parsedUserCart.map((v) => JSON.stringify(v));

      await databases.updateRow({
        databaseId,
        tableId: userCartId,
        rowId: cartDoc.$id,
        data: { CartItems: updatedCart },
      });
    },

    onSuccess: (data) => {
      console.log("✅ Cart updated successfully:", data);
      queryClient.invalidateQueries(["user-cart"]);
    },

    onError: (err) => {
      console.error("❌ Failed to update cart:", err.message);
    },
  });
};
