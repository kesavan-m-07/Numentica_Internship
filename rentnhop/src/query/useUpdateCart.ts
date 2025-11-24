import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  databases,
  userCartId,
  databaseId,
  citybikeInfo,
} from "../appwrite/AppWriteAccount";
import { Query } from "appwrite";
import {
  getUserCart,
  parseJsonCart,
  findCartEntry,
} from "../utils/BikesUtilities";
import { appState } from "../store";
import { Vehicle } from "../types";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const user = appState((state) => state.user);

  return useMutation({
    mutationFn: async ({ updatedVehicle, isIncrement }: { updatedVehicle: Vehicle; isIncrement: boolean }) => {
      if (!user || !updatedVehicle) throw new Error("Missing user or vehicle");

      // ALWAYS fetch fresh data (ensures consistent structure)
      const response = await getUserCart(user);

      const cartDoc = response?.rows?.[0];
      if (!cartDoc) throw new Error("Cart not found");

      const cart = parseJsonCart(cartDoc.CartItems);
      const entry = findCartEntry(cart, updatedVehicle);
      if (!entry) throw new Error("Cart entry not found");

      // --- REAL DB UPDATE ---
      if (isIncrement) {
        const available = await databases.listRows(
          databaseId,
          citybikeInfo,
          [
            Query.equal("area_slug", entry.areaSlug),
            Query.equal("bike_slug", entry.bikeSlug),
            Query.equal("status", "available"),
          ]
        );

        const next = available?.rows?.[0];
        if (!next) throw new Error("No bikes available");

        await databases.updateRow(
          databaseId,
          citybikeInfo,
          next.$id,
          { status: "incart" }
        );

        entry.vehicles.push(next.$id);
        entry.quantity++;
        entry.total += entry.pricePerDay * entry.duration.day;
      } else {
        const removedId = entry.vehicles.pop();

        if (removedId) {
          await databases.updateRow(
            databaseId,
            citybikeInfo,
            removedId,
            { status: "available" }
          );
        }

        entry.quantity = Math.max(0, entry.quantity - 1);
        entry.total -= entry.pricePerDay * entry.duration.day;

        if (entry.quantity === 0) {
          const idx = cart.indexOf(entry);
          if (idx >= 0) cart.splice(idx, 1);
        }
      }

      const payload = cart.map((c) => JSON.stringify(c));

      const updatedDoc = await databases.updateRow(
        databaseId,
        userCartId,
        cartDoc.$id,
        { CartItems: payload }
      );

      // return fully consistent structure
      return { rows: [updatedDoc] };
    },

    // ---- OPTIMISTIC UI ----
    onMutate: async ({ updatedVehicle, isIncrement }: { updatedVehicle: Vehicle; isIncrement: boolean }): Promise<{ previous?: unknown }> => {
      if (!user) return { previous: undefined };

      const key = ["user-cart", user.$id];

      await queryClient.cancelQueries({ queryKey: key });

      const previous = queryClient.getQueryData(key);

      if (!(previous as { rows?: unknown[] })?.rows?.[0]) return { previous };

      // stable clone
      const clone = structuredClone(previous);
      const cartDoc = (clone as { rows: Array<{ CartItems: unknown[] }> }).rows[0];
      const cart = parseJsonCart(cartDoc.CartItems);
      const entry = findCartEntry(cart, updatedVehicle);

      if (!entry) return { previous };

      // local optimistic edit
      if (isIncrement) {
        entry.quantity++;
        entry.total += entry.pricePerDay * entry.duration.day;
      } else {
        entry.quantity = Math.max(0, entry.quantity - 1);
        entry.total -= entry.pricePerDay * entry.duration.day;
        if (entry.quantity === 0) {
          const idx = cart.indexOf(entry);
          if (idx >= 0) cart.splice(idx, 1);
        }
      }

      cartDoc.CartItems = cart.map((c) => JSON.stringify(c)) as unknown[];

      queryClient.setQueryData(key, clone);

      return { previous };
    },

    onError: (_: Error, __: { updatedVehicle: Vehicle; isIncrement: boolean }, context: { previous?: unknown } | undefined) => {
      if (context?.previous && user) {
        queryClient.setQueryData(["user-cart", user.$id], context.previous);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart", user?.$id] });
    },
  });
};
