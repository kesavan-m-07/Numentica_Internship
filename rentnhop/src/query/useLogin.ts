import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../appwrite/LoginHelper";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
    },
    onSuccess: async () => {
      toast.success("Login Successfull..", { id: "login" });
      await queryClient.invalidateQueries({ queryKey: ["user-session"] });
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(`Login Failed.. ${error.message}`, { id: "login" });
    },
  });
};
