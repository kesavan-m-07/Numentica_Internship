import { useQuery } from "@tanstack/react-query";
import {
  databases,
  databaseId,
  cityInfo,
} from "../appwrite/AppWriteAccount";
import { Query } from "appwrite";

export const useCityInfo = (selectedArea: string) => {
  return useQuery({
    queryKey: ["city-info", selectedArea],
    queryFn: async () => {
      const res = await databases.listRows(
        databaseId,
        cityInfo,
        [Query.equal("slug", selectedArea)]
      );
      return res;
    },
    enabled: !!selectedArea,
  });
};
