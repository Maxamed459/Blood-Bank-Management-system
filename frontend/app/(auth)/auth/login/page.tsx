"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShowPass } from "../signUp/page";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { login } from "@/store/slices/authSlice";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  if (user) {
    router.push("/dashboard");
  }

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

    await dispatch(login(formData)).unwrap();
  };
  return (
    <div className="flex items-center justify-center h-screen bg-[url(/bg.jpg)] bg-no-repeat bg-cover min-h-screen">
      <div className="w-1/2">
        <h1 className="text-center text-3xl font-medium text-white">
          Create an account
        </h1>
        <p className="text-center text-[15px] text-gray-300">
          Enter your details below to create your account and donor a blood
        </p>
        {/* logo goes here */}
      </div>
      <div className="shadow-lg max-w-[90%] border-1 bg-white rounded-md border-gray-700/10 p-6 w-lg">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-medium">Login</h1>
          <p className="text-[15px] text-gray-600">
            Enter your details below to login your account
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-200 text-red-800 border-1 border-red-800 p-4">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                onChange={handleChange}
                id="password"
                type={showPass.condition ? "text" : "password"}
                required
              />

              {showPass.condition ? (
                <FaEye
                  className="absolute right-3 top-8.5 cursor-pointer"
                  onClick={() => setShowPass({ condition: false })}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-8.5 cursor-pointer"
                  onClick={() => setShowPass({ condition: true })}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#770411] hover:bg-[#490303]"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-1">
          {" "}
          <p className="my-4 text-sm">Don`t have an account? </p>
          <button
            disabled={loading}
            className="text-[#000b58] text-sm font-medium disabled:opacity-50"
          >
            <Link href="/auth/signUp">register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
