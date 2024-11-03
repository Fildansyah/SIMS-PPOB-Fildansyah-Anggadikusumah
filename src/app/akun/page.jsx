"use client";
import { AccountForm, Navbar, SelectAccountPicture } from "@/components";
import React, { useEffect } from "react";
import profpic from "../../../public/assets/Profile Photo.png";
import { useGetProfileQuery } from "@/services/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "@/services/auth/authSlice";
import { useAuth } from "@/utils/authHooks";
import { selectAuthState } from "@/services/store";

export default function Akun() {
  const { data, isSuccess, isLoading } = useGetProfileQuery();
  const responseData = data?.data;
  const { profileData } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const { useAuthlessRedirect, isAuthenticated } = useAuth();

  useAuthlessRedirect();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setProfileData({
          first_name: responseData?.first_name,
          last_name: responseData?.last_name,
          email: responseData?.email,
          profile_image: responseData?.profile_image,
        }),
      );
    }
  }, [
    dispatch,
    isSuccess,
    responseData?.email,
    responseData?.first_name,
    responseData?.last_name,
    responseData?.profile_image,
  ]);

  if (!isAuthenticated()) return null;

  const isImageEmpty = () => {
    const parts = profileData.profile_image.split("/");
    return parts[parts.length - 1] === "null";
  };

  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />
      <div className="flex flex-col w-full px-52 py-10 gap-10 items-center">
        <div className="flex flex-col gap-10 justify-center items-center">
          {isLoading ? (
            <div className="w-[100px] h-[100px] relative rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <SelectAccountPicture
              profileImage={
                isImageEmpty() ? profpic : profileData?.profile_image
              }
            />
          )}

          <p className="text-3xl font-semibold">
            {responseData?.first_name} {responseData?.last_name}
          </p>
        </div>

        <AccountForm />
      </div>
    </div>
  );
}
