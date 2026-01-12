import React from "react";
import { useForm } from "react-hook-form";
import FloatingLabel from "../dumb-components/FloatingLabel";
import Button from "../dumb-components/Button";
import { Link, useNavigate } from "react-router";
import { login } from "../app-write-files/LoginHelper";
import { useMutation } from "@tanstack/react-query";
import { appState } from "../store";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = appState((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["user-session"]);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      alert("Login failed,", error.message);
    },
  });

  const onSubmit = async (data) => {
    const userData = {
      email: data.mobileNumber + "@rentnhop.com",
      password: data.password,
    };

    loginMutation.mutate(userData);
  };
  if (loginMutation.isPending) return <p>Pending...</p>;
  if (user.username) {
    return navigate("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 font-lufga bg-white shadow-2xl p-5 rounded-3xl mx-3 md:mx-auto">
        <h2 className="text-center text-3xl font-semibold">Login</h2>
        <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mt-4">
            <input
              type="number"
              id="mobileNumber"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                minLength: { value: 10, message: "Must be 10 digits" },
                maxLength: { value: 10, message: "Must be 10 digits" },
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian mobile number",
                },
              })}
              placeholder=" "
              className="peer block w-full border border-gray-400 rounded-lg bg-transparent px-3 py-2 text-base text-gray-900 placeholder-transparent focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />

            <FloatingLabel label="Mobile number" id="mobileNumber" />
          </div>

          {errors.mobileNumber && (
            <p className="text-xs text-red-500">
              {errors.mobileNumber.message}
            </p>
          )}

          <div className="relative mt-4">
            <input
              type="text"
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder=" "
              className="peer block w-full border border-gray-400 rounded-lg bg-transparent px-3 py-2 text-base text-gray-900 placeholder-transparent focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
            <FloatingLabel label="Password" id="password" />
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}

          <Button label={"Login"} />

          <p className="text-center text-sm text-gray-600 mt-3">
            Not registered?{" "}
            <Link
              to={"/auth/register"}
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
