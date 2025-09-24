"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { formatDataTime } from "../../../lib/formatData";
import { IconShield, IconUsers, IconUserStar } from "@tabler/icons-react";
import { profile } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Pencil, User } from "lucide-react";
import { SlUserFemale } from "react-icons/sl";

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const Profile = async () => {
      try {
        // dispatch(profile()) returns a Promise
        const profilePromise = dispatch(profile()).unwrap();

        await toast.promise(profilePromise, {
          loading: "Getting your profile...",
          success: (data) => <b>Welcome {data.username}!</b>,
          error: (err) => <b>{err || "Failed to load profile"}</b>,
        });
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    Profile();
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="w-9 h-9 rounded-md shadow-md flex items-center justify-center fixed right-5 md:right-15 lg:right-25">
        <Pencil className="w-5 h-5" />
      </div>

      <div className="w-full md:w-[85%] mx-auto flex flex-col lg:flex-row mt-15 gap-6">
        <div className="w-full lg:w-1/2 border-1 shadow-md p-4 rounded-md">
          {user?.gender === "MALE" && <User className="w-24 h-24" />}
          {user?.gender === "FEMALE" && <SlUserFemale className="w-24 h-24" />}

          <div className="mt-4">
            <div className="mt-4">
              <p className="border-b-1 py-1 text-muted-foreground">
                <b>Fullname: </b>
                {user?.fullname}
              </p>
              <p className="border-b-1 py-1 text-muted-foreground">
                <b>Email: </b>
                {user?.email}
              </p>
              <p className="border-b-1 py-1 text-muted-foreground">
                {" "}
                <b>Id: </b>
                {user?.id}
              </p>
              <p className="border-b-1 py-1 text-muted-foreground">
                <b>Account created: </b>
                {formatDataTime(user?.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 grid gap-4">
          <div className="border-1 shadow-md p-4 rounded-md border-t-4 border-t-blue-600">
            <h2 className="text-xl font-semibold">Role</h2>
            <div className="mt-4">
              <p className="text-muted-foreground">
                <b className="">Role: </b>
                {user?.role}
                {user?.role === "ADMIN" && (
                  <IconShield className="text-blue-600 mt-4 h-9 w-9" />
                )}
                {user?.role === "STAFF" && (
                  <IconUserStar className="text-blue-600 mt-4 h-9 w-9" />
                )}
                {user?.role === "USER" && (
                  <IconUsers className="text-blue-600 mt-4 h-9 w-9" />
                )}
              </p>
            </div>
          </div>
          <div className="border-1 shadow-md p-4 rounded-md border-t-4 border-t-[#E81C24]">
            <h2 className="text-xl font-semibold">Blood Type</h2>
            <div className="">
              <p className="border-b-1 py-1 text-muted-foreground">
                <b>Blood type: </b>
                {user?.blood_type}
              </p>
              <p className="py-1 text-muted-foreground">
                <b>Gender: </b>
                {user?.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
