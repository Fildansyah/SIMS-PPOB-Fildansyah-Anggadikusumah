"use client";
import React from "react";
import { Modal } from "../common";
import { MdCheck, MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactionState } from "@/services/store";
import { SetCloseNotificationModal } from "@/services/transaction/transactionSlice";

const NotificationModal = ({ isFailed }) => {
  const router = useRouter();
  const { openNotificationModal, topUpAmount } = useSelector(
    selectTransactionState,
  );
  const dispatch = useDispatch();
  return (
    <Modal isOpen={openNotificationModal}>
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
        <p className="text-gray-600 ">Top Up sebesar</p>
        <p className="text-xl font-semibold">
          Rp {parseInt(topUpAmount).toLocaleString("id-ID")}
        </p>

        <p className="text-gray-600">{isFailed ? "gagal" : "berhasil!"}</p>
      </div>

      <p
        onClick={() => {
          dispatch(SetCloseNotificationModal());
          router.push("/");
        }}
        className=" text-red-500 hover:text-red-700 transition-colors font-semibold text-center cursor-pointer"
      >
        Kembali ke Beranda
      </p>
    </Modal>
  );
};

export default NotificationModal;
