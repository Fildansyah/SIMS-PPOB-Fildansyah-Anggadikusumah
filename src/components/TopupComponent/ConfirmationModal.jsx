import React from "react";
import { Modal } from "../common";
import Image from "next/image";
import logo from "../../../public/assets/Logo.png";

const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  amount,
  topUpFunc,
  loading,
}) => {
  return (
    <Modal isOpen={isModalOpen}>
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 rounded-full relative flex items-center justify-center">
          <Image src={logo} alt="Logo" fill className="object-cover" />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600 mb-2">Anda yakin untuk Top Up sebesar</p>
        <p className="text-xl font-semibold">
          Rp {parseInt(amount).toLocaleString("id-ID")} ?
        </p>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center ">
        <p
          onClick={() => {
            topUpFunc({ top_up_amount: amount });
          }}
          className={`${
            loading
              ? "cursor-not-allowed text-gray-500"
              : "cursor-pointer text-red-500 hover:text-red-700"
          }  transition-colors font-semibold cursor-pointer`}
        >
          Ya, lanjutkan Top Up
        </p>
        <p
          onClick={() => setIsModalOpen(false)}
          className=" text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          Batalkan
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
