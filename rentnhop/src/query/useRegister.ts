import { useMutation } from "@tanstack/react-query";
import { register } from "../appwrite/RegisterHelper";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onMutate: () => {
      toast.loading("Registering user..", { id: "register" });
    },
    onSuccess: () => {
      toast.success("Registration successfull..", { id: "register" });
      navigate("/auth/login");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(`Registration failed: ${error.message}`, { id: "register" });
    },
  });
};
