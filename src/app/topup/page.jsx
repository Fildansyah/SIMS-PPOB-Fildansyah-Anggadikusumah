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
import {
  setCloseConfirmationModal,
  setOpenNotificationModal,
} from "@/services/transaction/transactionSlice";
import { useAuth } from "@/utils/authHooks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Topup() {
  const { useAuthRedirect, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const [topup, { isError, isSuccess, isLoading }] = useTopupMutation();

  useAuthRedirect();

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(setOpenNotificationModal());
      dispatch(setCloseConfirmationModal());
    }
  }, [dispatch, isError, isSuccess]);

  if (!isAuthenticated()) return null;
  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />
      <div className="flex flex-col w-full px-52 py-10 gap-10">
        <div className="flex flex-row gap-5">
          <ProfileSection />
          <BalanceSection isBalanceVisible />
        </div>

        <div className="flex flex-col gap-14 ">
          <div className="flex flex-col">
            <p>Silahkan masukan</p>
            <p className="text-3xl font-semibold">Nominal Top Up</p>
          </div>

          <TopupInput />
        </div>
      </div>

      <ConfirmationModal topUpFunc={topup} loading={isLoading} />

      <NotificationModal isFailed={isError} />
    </div>
  );
}
