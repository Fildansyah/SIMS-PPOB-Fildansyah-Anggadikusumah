"use client";

import {
  BalanceSection,
  Button,
  InputText,
  Navbar,
  PembayaranConfirmationModal,
  PembayaranNotificationModal,
  ProfileSection,
} from "@/components";
import { useGetServicesQuery } from "@/services/information/informationApi";
import { useTransactionMutation } from "@/services/transaction/transactionApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineMoney } from "react-icons/md";

export default function Pembayaran() {
  const params = useParams();
  const { service_code } = params;
  const { data, isSuccess, isLoading } = useGetServicesQuery();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [
    transaction,
    {
      isError: isErrorTransaction,
      isSuccess: isTransactionSuccess,
      isLoading: isTransactionLoading,
    },
  ] = useTransactionMutation();

  const service =
    isSuccess && data?.data.find((item) => item.service_code === service_code);

  useEffect(() => {
    if (isTransactionSuccess || isErrorTransaction) {
      setOpenNotificationModal(true);
      setOpenConfirmationModal(false);
    }
  }, [isErrorTransaction, isTransactionSuccess, setOpenNotificationModal]);

  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />

      <div className="flex flex-col w-full px-52 py-10 gap-10">
        <div className="flex flex-row gap-5">
          <ProfileSection />
          <BalanceSection isBalanceVisible />
        </div>

        <div className="flex flex-col gap-14 ">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-gray-500">PemBayaran</p>
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="w-[25px] h-[25px] relative rounded-md overflow-hidden bg-gray-400 animate-pulse" />
              ) : (
                <div className="w-[25px] h-[25px] relative rounded-md overflow-hidden bg-gray-400">
                  <Image
                    src={service?.service_icon}
                    alt="service"
                    fill
                    unoptimized
                  />
                </div>
              )}

              {isLoading ? (
                <div className="w-40 h-6 bg-gray-200 animate-pulse rounded" />
              ) : (
                <p className="font-semibold">{service?.service_name}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 flex-[6]">
            {isLoading ? (
              <div className="w-full h-[50px] bg-gray-200 animate-pulse rounded" />
            ) : (
              <InputText
                leftComponent={<MdOutlineMoney size={24} color={"black"} />}
                value={parseInt(service?.service_tariff).toLocaleString(
                  "id-ID",
                )}
                type="text"
                disabled
              />
            )}

            <Button
              type="button"
              onClick={() => setOpenConfirmationModal(true)}
              className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 transition-all"
            >
              Bayar
            </Button>
          </div>
        </div>
      </div>

      <PembayaranConfirmationModal
        amount={service?.service_tariff}
        isModalOpen={openConfirmationModal}
        service_name={service?.service_name}
        setIsModalOpen={setOpenConfirmationModal}
        service_code={service_code}
        paymentFunc={transaction}
        loading={isTransactionLoading}
      />

      <PembayaranNotificationModal
        amount={service?.service_tariff}
        service_name={service?.service_name}
        isModalOpen={openNotificationModal}
        setIsModalOpen={setOpenNotificationModal}
      />
    </div>
  );
}
