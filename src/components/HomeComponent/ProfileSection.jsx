import Image from "next/image";
import React from "react";
import profpic from "../../../public/assets/Profile Photo.png";

const ProfileSection = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Image
        src={profpic}
        alt="Profile Photo"
        width={100}
        height={100}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p>Selamat datang,</p>
        <p className="text-3xl font-semibold">Kristanto Wibowo</p>
      </div>
    </div>
  );
};

export default ProfileSection;
