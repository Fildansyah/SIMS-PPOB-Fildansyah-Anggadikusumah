"use client";

import Image from "next/image";
import React from "react";
import profpic from "../../../public/assets/Profile Photo.png";
import { useGetProfileQuery } from "@/services/auth/authApi";

const ProfileSection = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  const profileData = data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="w-[100px] h-[100px] relative rounded-full bg-gray-200 animate-pulse" />

        <div className="flex flex-col gap-2">
          <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded" />
          <div className="w-2/3 h-6 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p>Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  const isImageEmpty = () => {
    const parts = profileData.profile_image.split("/");
    return parts[parts.length - 1] === "null";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-[100px] h-[100px] relative overflow-hidden rounded-full">
        <Image
          src={isImageEmpty() ? profpic : profileData.profile_image}
          alt="Profile Photo"
          fill
          className="rounded-full overflow-hidden object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col">
        <p>Selamat datang,</p>
        <p className="text-3xl font-semibold">
          {profileData?.first_name + " " + profileData?.last_name}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
