import { useMutation } from "@tanstack/react-query";
import { logout } from "../app-write-files/logoutUser";
import { appState } from "../Store";
import { useNavigate } from "react-router";
export const useLogout = () => {
  const removeUser = appState((state) => state.removeUser);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
      navigate("/auth/login");
    },
     onError: (error) => {
      console.error("Logout error:", error);
      alert("Failed to logout. Try again.");
    },
  });
};
