"use client";
import React from "react";
import { Modal } from "../common";
import { useRouter } from "next/navigation";
import { MdCheck, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectRegistrationState } from "@/services/store";
import { setNotification } from "@/services/registration/registrationSlice";

const RegistNotificationModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { notification, registStatus } = useSelector(selectRegistrationState);

  const isFailed = registStatus === "failed";

  return (
    <Modal isOpen={notification}>
      <div className="flex justify-center mb-6">
        <div
          className={`w-14 h-14 ${
            isFailed ? "bg-red-500" : "bg-green-500"
          } rounded-full relative flex items-center justify-center`}
        >
          {isFailed ? (
            <MdClose className="text-white text-3xl" />
          ) : (
            <MdCheck className="text-white text-3xl" />
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-col text-center mb-6">
        <p className="text-gray-600 ">Registrasi anda</p>

        <p className="text-gray-600">{isFailed ? "gagal" : "berhasil!"}</p>
      </div>

      <p
        onClick={() => {
          dispatch(setNotification(false));
          if (!isFailed) {
            router.push("/login");
          }
        }}
        className=" text-red-500 hover:text-red-700 transition-colors font-semibold text-center cursor-pointer"
      >
        Kembali login
      </p>
    </Modal>
  );
};

export default RegistNotificationModal;
