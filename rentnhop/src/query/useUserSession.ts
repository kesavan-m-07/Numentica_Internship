import { useQuery } from "@tanstack/react-query";
import { getUser } from "../appwrite/getUser";
import { appState } from "../store/index";

export const useUserSession = () => {
  const setUser = appState((state) => state.setUser);
  
  return useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const user = await getUser();
      setUser(user.name, user.email, user.$id);
      return user;
    },
    retry: false,
  });
};
