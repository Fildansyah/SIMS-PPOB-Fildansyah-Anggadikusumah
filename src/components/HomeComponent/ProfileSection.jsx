"use client";

import Image from "next/image";
import React from "react";
import profpic from "../../../public/assets/Profile Photo.png";
import { useGetProfileQuery } from "@/GlobalRedux/auth/authApi";

const ProfileSection = () => {
  const { data } = useGetProfileQuery();

  const profileData = data?.data;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-[100px] h-[100px] relative overflow-hidden rounded-full">
        <Image
          src={profileData?.profile_image || profpic}
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
