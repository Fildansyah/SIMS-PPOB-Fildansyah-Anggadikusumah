"use client";
import {
  BalanceSection,
  ConfirmationModal,
  Navbar,
  NotificationModal,
  ProfileSection,
  TopupInput,
} from "@/components";
import { useTopupMutation } from "@/services/transaction/transactionApi";
import React, { useEffect, useState } from "react";

export default function Topup() {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [topup, { isError, isSuccess, isLoading, data }] = useTopupMutation();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isSuccess || isError) {
      setOpenNotificationModal(true);
      setOpenConfirmationModal(false);
    }
  }, [isError, isSuccess, setOpenNotificationModal]);

  console.log("data", data);

  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />
      <div className="flex flex-col w-full px-52 py-10 gap-10">
        <div className="flex flex-row gap-5">
          <ProfileSection />
          <BalanceSection />
        </div>

        <div className="flex flex-col gap-14 ">
          <div className="flex flex-col">
            <p>Silahkan masukan</p>
            <p className="text-3xl font-semibold">Nominal Top Up</p>
          </div>

          <TopupInput
            amount={amount}
            setAmount={setAmount}
            setModalOpen={setOpenConfirmationModal}
          />
        </div>
      </div>

      <ConfirmationModal
        isModalOpen={openConfirmationModal}
        setIsModalOpen={setOpenConfirmationModal}
        amount={amount}
        topUpFunc={topup}
        loading={isLoading}
      />

      <NotificationModal
        isModalOpen={openNotificationModal}
        isFailed={isError}
        setIsModalOpen={setOpenNotificationModal}
        amount={amount}
      />
    </div>
  );
}