"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { MdEdit } from "react-icons/md";
import profpic from "../../../public/assets/Profile Photo.png";
import { useUpdateProfileImageMutation } from "@/services/profile/profileApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectAccountPicture = ({ profileImage }) => {
  const fileInputRef = useRef(null);
  const maxSize = 100 * 1024;
  const [updateProfileImage, { isSuccess, isError }] =
    useUpdateProfileImageMutation();

  useEffect(() => {
    if (isSuccess) {
      location.reload();
      toast.success("Profile image updated successfully");
    }

    if (isError) {
      toast.error("Failed to update profile image");
    }
  }, [isError, isSuccess]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > maxSize) {
        toast.error("File size must be less than 100 KB");
        return;
      } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toast.error("Only JPEG and PNG files are allowed");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      updateProfileImage(formData);

      console.log(file);
    }
  };

  return (
    <div className="w-[125px] h-[125px] relative rounded-full ">
      <Image
        src={profileImage || profpic}
        alt="profile"
        fill
        className="object-cover rounded-full"
        unoptimized
      />

      <button
        type="button"
        onClick={handleEditClick}
        className="absolute bottom-0 right-0 bg-white rounded-full p-2 border"
      >
        <MdEdit size={14} />
      </button>

      <input
        type="file"
        accept=".jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        theme="colored"
      />
    </div>
  );
};

export default SelectAccountPicture;
