import { useQuery } from "@tanstack/react-query";
import { databases, databaseId, bikeInfo } from "../appwrite/AppWriteAccount";
import { Query } from "appwrite";

export const useBikeInfo = (bikeSlug: string) => {
  return useQuery({
    queryKey: ["bike-info", bikeSlug],
    queryFn: async () => {
      const res = await databases.listRows(
        databaseId,
        bikeInfo,
        [Query.equal("slug", bikeSlug)]
      );
      return res.rows?.[0];
    },
    enabled: !!bikeSlug,
  });
};
