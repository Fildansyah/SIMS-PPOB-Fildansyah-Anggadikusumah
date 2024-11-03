"use client";
import { Button, InputText, Navbar } from "@/components";
import React, { useEffect, useState } from "react";
import profpic from "../../../public/assets/Profile Photo.png";
import Image from "next/image";
import { MdAlternateEmail, MdEdit, MdOutlinePerson } from "react-icons/md";
import { useGetProfileQuery } from "@/services/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfileData } from "@/services/auth/authSlice";
import { useAuth } from "@/utils/authHooks";
import { selectAuthState } from "@/services/store";

export default function Akun() {
  const { data, isSuccess } = useGetProfileQuery();
  const [profileImage, setProfileImage] = useState(profpic);
  const [isEditing, setIsEditing] = useState(false);
  const { useAuthRedirect } = useAuth();
  const { profileData } = useSelector(selectAuthState);
  const responseData = data?.data;

  const dispatch = useDispatch();

  useAuthRedirect();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setProfileData({
          first_name: responseData?.first_name,
          last_name: responseData?.last_name,
          email: responseData?.email,
        }),
      );
    }

    const imageChecker = () => {
      const parts = responseData.profile_image.split("/");
      if (parts[3] === "null") {
        return true;
      }
      return false;
    };

    if (isSuccess && imageChecker()) {
      setProfileImage(responseData?.profile_image);
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
            {profileData?.first_name} {profileData?.last_name}
          </p>
        </div>

        <form className="w-[60%] flex flex-col gap-12">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                leftComponent={
                  <MdAlternateEmail
                    size={14}
                    color={profileData?.email ? "black" : "gray"}
                  />
                }
                placeholder="masukan email anda"
                value={profileData?.email}
                type="email"
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Nama Depan</label>
              <InputText
                leftComponent={
                  <MdOutlinePerson
                    size={14}
                    color={profileData?.first_name ? "black" : "gray"}
                  />
                }
                placeholder="nama depan"
                type="text"
                value={profileData?.first_name}
                disabled={!isEditing}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Nama Belakang</label>
              <InputText
                leftComponent={
                  <MdOutlinePerson
                    size={14}
                    color={profileData?.last_name ? "black" : "gray"}
                  />
                }
                placeholder="nama belakang"
                type="text"
                value={profileData?.last_name}
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
