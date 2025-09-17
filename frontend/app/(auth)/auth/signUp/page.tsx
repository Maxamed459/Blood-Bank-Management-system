"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadUserFromStorage, registerUser } from "@/store/slices/authSlice";

interface FormData {
  fullname: string;
  email: string;
  username: string;
  password: string;
  blood_type: string;
  gender: string;
}
export interface ShowPass {
  condition: boolean;
}

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPass, setShowPass] = useState<ShowPass>({ condition: false });
  const [formData, setFormData] = useState<Omit<FormData, "fullname">>({
    username: "",
    email: "",
    password: "",
    blood_type: "",
    gender: "",
  });
  const { user, loading, error } = useAppSelector((state) => state.auth);
  console.log(user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // generic handler
  const handleSelectChange = (
    field: "blood_type" | "gender",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullNameCombined = `${firstName} ${lastName}`;

    const finalFormData = {
      ...formData,
      fullname: fullNameCombined,
    };

    await dispatch(registerUser(finalFormData)).unwrap(); // 👈 call context function
  };

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }
  return (
    <div className="flex flex-col items-center justify-center p-5 relative bg-[url(/bg.jpg)] bg-no-repeat bg-cover min-h-screen">
      <div className="flex items-center border-1 mt-10 w-full px-20  border-gray-700/10 overflow-hidden">
        <div className="w-1/2">
          <h1 className="text-center text-3xl font-medium text-white">
            Create an account
          </h1>
          <p className="text-center text-[15px] text-gray-300">
            Enter your details below to create your account and donor a blood
          </p>
          {/* logo goes here */}
        </div>

        <div className="p-6 w-full md:w-1/2 bg-white border-1 rounded-md border-gray-100/10 shadow-md">
          <div className="mb-8">
            <h1 className="text-xl font-medium text-black">
              Create an account
            </h1>
            <p className="text-[11px] text-gray-600">
              Enter your details below to create your account
            </p>
            {/* logo goes here */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-200 text-red-800 border-1 border-red-800 p-4">
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <div className="flex items-center w-full gap-5">
                <div className="space-y-1 w-full">
                  <Label htmlFor="firstName" className="text-xs text-black">
                    First name
                  </Label>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    className="w-full border-1 border-slate-600 text-black"
                    type="text"
                    placeholder="mohamed"
                    required
                  />
                </div>
                <div className="space-y-1 w-full">
                  <Label htmlFor="lastName" className="text-xs text-black">
                    Last name
                  </Label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border-1 border-slate-600 text-black"
                    id="lastName"
                    type="text"
                    placeholder="mahdi"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username" className="text-xs text-black">
                  Username
                </Label>
                <Input
                  onChange={handleChange}
                  id="username"
                  type="text"
                  placeholder="your username"
                  required
                  className="border-1 border-slate-600 text-black"
                />
              </div>

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

              <div className="grid gap-2">
                <Label htmlFor="blood_type" className="text-xs text-black">
                  Blood type
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("blood_type", value)
                  }
                >
                  <SelectTrigger className="w-full border-1 border-slate-600 text-black">
                    <SelectValue placeholder="Select Blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="A_POSITIVE">A_POSITIVE</SelectItem>
                      <SelectItem value="A_NEGATIVE">A_NEGATIVE</SelectItem>
                      <SelectItem value="B_POSITIVE">B_POSITIVE</SelectItem>
                      <SelectItem value="B_NEGATIVE">B_NEGATIVE</SelectItem>
                      <SelectItem value="O_POSITIVE">O_POSITIVE</SelectItem>
                      <SelectItem value="O_NEGATIVE">O_NEGATIVE</SelectItem>
                      <SelectItem value="AB_POSITIVE">AB_POSITIVE</SelectItem>
                      <SelectItem value="AB_NEGATIVE">AB_NEGATIVE</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender" className="text-xs text-black">
                  Gender
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="w-full border-1 border-slate-600 text-black">
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="MALE">MALE</SelectItem>
                      <SelectItem value="FEMALE">FEMALE</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  Create account
                </Button>
              </div>
            </div>
          </form>

          <div className="flex items-center gap-1 mt-4">
            <p className="text-sm text-black">Already have an account?</p>
            <button className="text-[#000b58] text-sm font-medium">
              <Link href="/auth/login">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
