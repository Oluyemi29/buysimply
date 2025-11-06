import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import z from "zod";
import { FormSchema } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userAuth from "../store/userStore";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const { Login } = userAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  type FormSchemaType = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const submit = async (value: FormSchemaType) => {
    setLoading(true);
    try {
      const { email, password } = value;
      const response = await Login(email, password);
      if (response) {
        console.log(email, password);
        return navigate("/loan");
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-row w-full bg-fadebg h-screen">
      <div className="bg-fadepurple w-full flex flex-col justify-center px-10">
        <img src="/logo.png" alt="logo" width={20} className="w-20" />
        <img
          src="/people.png"
          alt="logo"
          width={20}
          className="w-[98%] mt-10"
        />
        <div className="flex flex-col w-full mt-5 justify-center items-center">
          <h1 className="text-mainpurple font-semibold">Team Achiever</h1>
          <p className="text-[0.8rem] font-semibold text-maindark">
            Your perfect solution for funding your desires
          </p>
        </div>
      </div>
      <div className="w-full bg-transparent flex flex-col justify-center items-center">
        <div className="w-[90%] mx-auto">
          <h1 className="text-mainpurple font-semibold text-center">
            Welcome Back
          </h1>
          <p className="text-maindark text-[0.7rem] text-center">
            Enter your email address and password to access your account
          </p>
          <form onSubmit={handleSubmit(submit)}>
            <div className="mt-5">
              <p className="text-[0.7rem] text-maindark">
                Email Address
                <span className="text-red-600 font-semibold text-sm pl-1">
                  *
                </span>
              </p>
              <input
                placeholder="Enter your email"
                className="w-full h-10 px-4 border-2 border-maindark rounded-md mt-2"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[0.6rem] text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <p className="text-[0.7rem] text-maindark">
                Password
                <span className="text-red-600 font-semibold text-sm pl-1">
                  *
                </span>
              </p>
              <div className="relative w-full flex flex-row justify-center items-center">
                <input
                  placeholder="Password"
                  className="w-full h-10 px-4 border-2 border-maindark rounded-md mt-2"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />

                <div className="bg-littledark p-2.5 rounded-md -ml-9.5 mt-2 w-max">
                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPassword(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShowPassword(true)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-[0.6rem] text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-row justify-between mt-2 items-center">
              <div className="flex flex-row justify-center items-center gap-2">
                <input type="checkbox" />
                <p className="text-[0.7rem]">Remember me</p>
              </div>
              <p className="text-mainpurple text-[0.7rem]">Forget Password?</p>
            </div>

            <div className="w-full mt-16">
              {loading ? (
                <button
                  type="button"
                  disabled
                  className="bg-mainpurple/65 cursor-not-allowed text-white w-full rounded-md h-10"
                >
                  Processing...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-mainpurple text-white w-full rounded-md h-10 cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
