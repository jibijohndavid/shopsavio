"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { TOKEN, axiosClient, postRequest, ROLE } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginUserInput,
  LoginUserSchema,
} from "../api/auth/login/LoginUserSchema";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const handleSignIn = async (formInput: LoginUserInput) => {
    try {
      const res = await postRequest(`auth/login`, formInput);
      console.log(res);

      const { data } = await postRequest(`auth/login`, formInput);

      if (data.success) {
        localStorage.setItem(TOKEN, data?.token ?? "");
        localStorage.setItem(ROLE, data?.data?.role ?? "");
        axiosClient.defaults.headers.common = {
          Authorization: `Bearer ${data?.token ?? ""}`,
        };
        router.replace("/admin");
      } else {
        toast.error(data.message ?? "Incorrect email or password");
      }
    } catch (error) {
      toast.error("Internal Server Error. Please contact Admin.");
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#101827]">
        <div className="m-auto w-80 md:w-[26rem] rounded-2xl bg-[#1f2a37] px-6 py-8 md:py-12 md:px-10 shadow-md lg:max-w-xl">
          <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
            USER LOGIN
          </h1>

          <div className="mt-6 md:mt-10 md:px-4">
            <form onSubmit={handleSubmit(handleSignIn)}>
              <div className="mt-2 grid gap-4">
                <div>
                  <label className="input-text-label">Email</label>
                  <input
                    className="input-text"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <p className="text-xs text-red-400 ml-2 mt-1">
                    {errors.email?.message}
                  </p>
                </div>

                <div>
                  <label className="input-text-label">Password</label>
                  <input
                    type="password"
                    placeholder="********"
                    className="input-text"
                    {...register("password")}
                  />
                  <p className="text-xs text-red-400 ml-2 mt-1">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <div className="mt-10 mx-8">
                <button type="submit" className="button">
                  Login
                </button>
              </div>

              <p className="text-center mt-3 opacity-30">
                <a href="https://dridatah.com" target="blank">
                  <small>
                    Made with <span className="text-[#f57482]">❤️</span>
                  </small>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
