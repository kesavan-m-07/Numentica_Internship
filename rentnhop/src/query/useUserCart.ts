import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../utils/BikesUtilities";
import { User } from "../types";

export const useUserCart = (user: User | null) => {
  return useQuery({
    queryKey: ["user-cart", user?.$id],
    queryFn: async () => await getUserCart(user),
    enabled: !!user?.$id
  });
};
