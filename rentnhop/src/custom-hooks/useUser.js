import { useQuery } from "@tanstack/react-query";
import { getUser } from "../app-write-files/getUser";
import { appState } from "../store/index";
import { useNavigate } from "react-router";

export const useUser = () => {
  const setUser = appState((state) => state.setUser);
  const removeUser = appState((state) => state.removeUser);
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const user = await getUser();
      setUser(user.name, user.email);
      return user;
    },
    onError: () => {
      removeUser();
      navigate("/auth/login");
    },
    staleTime: 5000 * 60,
    retry: false,
  });
};
