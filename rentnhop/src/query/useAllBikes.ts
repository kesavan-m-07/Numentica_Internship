import { useQuery } from "@tanstack/react-query";
import { databases, databaseId, bikeInfo } from "../appwrite/AppWriteAccount";

export const useAllBikes = () => {
  return useQuery({
    queryKey: ['all-bikes'],
    queryFn: async () => {
      return await databases.listRows(databaseId, bikeInfo, []);
    }
  });
};
