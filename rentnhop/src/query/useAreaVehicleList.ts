import { useQuery } from "@tanstack/react-query";
import { databases, databaseId, citybikeInfo } from "../appwrite/AppWriteAccount";
import { Query } from "appwrite";

export const useAreaVehicleList = (areaSlug: string , bikeSlug: string) => {
  return useQuery({
    queryKey: [areaSlug, bikeSlug],
    queryFn: async () => {
      const res = await databases.listRows(
        databaseId,
        citybikeInfo,
        [
          Query.equal("area_slug", areaSlug),
          Query.equal("bike_slug", bikeSlug),
          Query.equal("status", "available"),
        ]
      );
      return res.rows;
    },
    enabled: !!areaSlug && !!bikeSlug
  });
};
