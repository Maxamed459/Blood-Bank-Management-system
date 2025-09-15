"use client";
import React, { useState } from "react";
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
import { registerUser, loadUserFromStorage } from "@/store/slices/authSlice";

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

const Registerpage = () => {
  const { loading, error } = useAppSelector((state) => state.auth);
  const user = loadUserFromStorage();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
  if (user) {
    router.push("/dashboard");
    return null;
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
            <h1 className="text-xl font-medium">Create an account</h1>
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
                  <Label htmlFor="firstName" className="text-xs ">
                    First name
                  </Label>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    className="w-full"
                    type="text"
                    placeholder="mohamed"
                    required
                  />
                </div>
                <div className="space-y-1 w-full">
                  <Label htmlFor="lastName" className="text-xs">
                    Last name
                  </Label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full"
                    id="lastName"
                    type="text"
                    placeholder="mahdi"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username" className="text-xs">
                  Username
                </Label>
                <Input
                  onChange={handleChange}
                  id="username"
                  type="text"
                  placeholder="yourusername"
                  required
                />
              </div>

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

              <div className="grid gap-2">
                <Label htmlFor="blood_type" className="text-xs">
                  Blood type
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("blood_type", value)
                  }
                >
                  <SelectTrigger className="w-full">
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
                <Label htmlFor="gender" className="text-xs">
                  Gender
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
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
                  className="w-full bg-[#A30B1C] hover:bg-[#910a1a] disabled:opacity-50"
                  disabled={loading}
                >
                  Create account
                </Button>
              </div>
            </div>
          </form>

          <div className="flex items-center gap-1 mt-4">
            <p className="text-sm">Already have an account?</p>
            <button className="text-[#000b58] text-sm font-medium">
              <Link href="/auth/login">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
