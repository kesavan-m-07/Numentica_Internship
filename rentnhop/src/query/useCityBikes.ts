import { useQuery } from "@tanstack/react-query";
import { databases, databaseId, citybikeInfo } from "../appwrite/AppWriteAccount";
import { Query } from "appwrite";

export const useCityBikes = (areas: string[] ) => {
  return useQuery({
    queryKey: ["city-bikes", areas],
    queryFn: async () => {
      return databases.listRows(databaseId, citybikeInfo, [
        Query.contains('area_slug', areas),
        Query.limit(1000),
        Query.equal('status', 'available')
      ]);
    },
    enabled: !!areas && areas.length > 0,
  });
};
