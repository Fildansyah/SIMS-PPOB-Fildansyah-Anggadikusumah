"use client";
import React, { useEffect, useState } from "react";
import { Button, InputText } from "../common";
import { MdAlternateEmail, MdOutlinePerson } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "@/services/profile/profileApi";
import { selectAuthState } from "@/services/store";
import { logout, setProfileData } from "@/services/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData } = useSelector(selectAuthState);

  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [updateProfile, { isError, isLoading, isSuccess }] =
    useUpdateProfileMutation();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    dispatch(
      setProfileData({
        ...profileData,
        email: e.target.value,
      }),
    );
  };

  const handleFirstNameChange = (e) => {
    dispatch(
      setProfileData({
        ...profileData,
        first_name: e.target.value,
      }),
    );
  };

  const handleLastNameChange = (e) => {
    dispatch(
      setProfileData({
        ...profileData,
        last_name: e.target.value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(profileData?.email)) {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }

    updateProfile(profileData);
    console.log(profileData);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false);
      toast.success("Data profil berhasil diperbarui");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    if (isError) {
      toast.error("Data profil gagal diperbarui");
    }
  }, [isError, isSuccess, router]);

  return (
    <form onSubmit={handleSubmit} className="w-[60%] flex flex-col gap-12">
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
            hasError={!isEmailValid}
            errorMessage={
              !isEmailValid ? "tolong masukan email yang valid" : ""
            }
            onChange={handleEmailChange}
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
            onChange={handleFirstNameChange}
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
            onChange={handleLastNameChange}
          />
        </div>
      </div>

      {isEditing ? (
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
        >
          {isLoading ? "Loading..." : "Simpan"}
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
            onClick={handleLogout}
            className="w-full border border-red-500 py-2 rounded-sm text-red-500 font-semibold hover:bg-red-50 hover:shadow-md transition-all"
          >
            Logout
          </Button>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        theme="colored"
      />
    </form>
  );
};

export default AccountForm;
