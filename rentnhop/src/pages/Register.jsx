import { useForm } from "react-hook-form";
import FloatingLabel from "../dumb-components/FloatingLabel";
import Button from "../dumb-components/Button";
import { Link, useNavigate } from "react-router";
import { register } from "../app-write-files/RegisterHelper";
import { useMutation } from "@tanstack/react-query";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (userData) => {
      reset();
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error.message);
      return alert(`Error in register,${error.message}`, );
    },
  });

  const onSubmit = async (data) => {
   
    const userData = {
      email: data.mobileNumber + "@rentnhop.com",
      password: data.password,
      name: data.name,
    };
   registerMutation.mutate(userData);
  };

  const password = watch("password");

  if(registerMutation.isPending) return <p>Registering....</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full md:w-1/2 lg:w-1/3 font-lufga bg-white shadow-2xl p-6 rounded-3xl mx-3 md:mx-auto">
        <h2 className="text-center text-3xl font-semibold">Register</h2>

        <form className="my-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              type="text"
              id="name"
              {...formRegister("name", { required: "Name is required" })}
              placeholder=" "
              className="peer block w-full border border-gray-400 rounded-lg bg-transparent px-3 py-2 text-base text-gray-900 placeholder-transparent focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
            <FloatingLabel label={"Name"} id="name" />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="relative">
            <input
              type="number"
              id="mobile"
              {...formRegister("mobileNumber", {
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
            <FloatingLabel label={"Mobile number"} id="mobile" />
            {errors.mobileNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              {...formRegister("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder=" "
              className="peer block w-full border border-gray-400 rounded-lg bg-transparent px-3 py-2 text-base text-gray-900 placeholder-transparent focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
            <FloatingLabel label={"Password"} id="password" />

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              {...formRegister("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder=" "
              className="peer block w-full border border-gray-400 rounded-lg bg-transparent px-3 py-2 text-base text-gray-900 placeholder-transparent focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
            <FloatingLabel label={"Confirm Password"} id="confirmPassword" />

            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button label={"Register"} />

          <p className="text-center text-sm text-gray-600 mt-3">
            Already registered?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
