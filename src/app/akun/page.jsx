"use client";
import { Button, InputText, Navbar } from "@/components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import profpic from "../../../public/assets/Profile Photo.png";
import Image from "next/image";
import { MdAlternateEmail, MdEdit, MdOutlinePerson } from "react-icons/md";
import { useGetProfileQuery } from "@/services/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/services/auth/authSlice";
import { useAuth } from "@/utils/authHooks";

export default function Akun() {
  const { data, isSuccess } = useGetProfileQuery();
  const [profileImage, setProfileImage] = useState(profpic);
  const [isEditing, setIsEditing] = useState(false);
  const { useAuthRedirect } = useAuth();

  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useAuthRedirect();

  useEffect(() => {
    const profileData = data?.data;

    if (isSuccess) {
      setBodyData({
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
        email: profileData?.email,
      });
    }

    if (profileData?.profile_image) {
      setProfileImage(profileData?.profile_image);
    }
  }, [data?.data, isSuccess]);

  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />
      <div className="flex flex-col w-full px-52 py-10 gap-10 items-center">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="w-[125px] h-[125px] relative rounded-full ">
            <Image
              src={profileImage}
              alt="profile"
              fill
              className="object-cover rounded-full"
              unoptimized
            />

            <button
              type="button"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 border"
            >
              <MdEdit size={14} />
            </button>
          </div>

          <p className="text-3xl font-semibold">
            {bodyData?.first_name} {bodyData?.last_name}
          </p>
        </div>

        <form className="w-[60%] flex flex-col gap-12">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                leftComponent={<MdAlternateEmail size={14} color="gray" />}
                placeholder="masukan email anda"
                value={bodyData?.email}
                type="email"
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Nama Depan</label>
              <InputText
                leftComponent={<MdOutlinePerson size={14} color="gray" />}
                placeholder="nama depan"
                type="text"
                value={bodyData?.first_name}
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Nama Belakang</label>
              <InputText
                leftComponent={<MdOutlinePerson size={14} color="gray" />}
                placeholder="nama belakang"
                type="text"
                value={bodyData?.last_name}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing ? (
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
            >
              Simpan
            </Button>
          ) : (
            <div className="flex flex-col gap-5">
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
              >
                Edit Profil
              </Button>

              <Button
                type="button"
                onClick={() => {
                  dispatch(logout());
                  setIsEditing(true);
                }}
                className="w-full border border-red-500 py-2 rounded-sm text-red-500 font-semibold hover:bg-red-50 hover:shadow-md transition-all"
              >
                Logout
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
