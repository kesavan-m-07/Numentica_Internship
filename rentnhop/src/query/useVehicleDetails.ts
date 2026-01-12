import { useQuery } from "@tanstack/react-query";
import {
  databases,
  databaseId,
  citybikeInfo,
} from "../appwrite/AppWriteAccount";

export const useVehicleDetails = (vehicleId: string | undefined) => {
  return useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const data = await databases.getRow(
        databaseId,
        citybikeInfo,
        vehicleId
      );
      return data;
    },
    enabled: !!vehicleId
  });
};
