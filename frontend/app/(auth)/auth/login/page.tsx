"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShowPass } from "../signUp/page";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadUserFromStorage, login } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState<ShowPass>({ condition: false });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginPromise = dispatch(login(formData)).unwrap();

    try {
      await toast.promise(loginPromise, {
        loading: "Logging in...",
        success: <b>Welcome back!</b>,
        error: <b>{error}</b>,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);
  return (
    <div className="flex items-center justify-center h-screen bg-[url(/bg.jpg)] bg-no-repeat bg-cover min-h-screen">
      <div className="w-1/2">
        <h1 className="text-center text-3xl font-medium text-white mb-4">
          login with your account
        </h1>
        <p className="text-center text-[15px] text-gray-300">
          Enter your details to login your account and donor a blood
        </p>
        {/* logo goes here */}
      </div>
      <div className="shadow-lg max-w-[90%] border-1 bg-white rounded-md border-gray-700/10 p-6 w-lg">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-medium text-black">Login</h1>
          <p className="text-[15px] text-gray-600">
            Enter your details below to login your account
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs text-black">
                Email
              </Label>
              <Input
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-1 border-slate-600 text-black"
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password" className="text-xs text-black">
                Password
              </Label>
              <Input
                onChange={handleChange}
                id="password"
                type={showPass.condition ? "text" : "password"}
                required
                className="border-1 border-slate-600 text-black"
              />

              {showPass.condition ? (
                <FaEye
                  className="absolute right-3 top-8.5 cursor-pointer text-black"
                  onClick={() => setShowPass({ condition: false })}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-8.5 cursor-pointer text-black"
                  onClick={() => setShowPass({ condition: true })}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#A30B1C] hover:bg-[#910a1a] disabled:opacity-50 text-white"
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-1">
          {" "}
          <p className="my-4 text-sm text-black">Don`t have an account? </p>
          <button className="text-[#000b58] text-sm font-medium ">
            <Link href="/auth/signUp">register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
