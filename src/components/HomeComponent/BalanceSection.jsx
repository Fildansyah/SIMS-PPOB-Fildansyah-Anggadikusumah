"use client";

import { useGetBalanceQuery } from "@/services/balance/balanceApi";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const BalanceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, isLoading } = useGetBalanceQuery();

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };

  const balance = parseInt(data?.data?.balance || 0).toLocaleString("id-ID");

  return (
    <div
      className="flex flex-col w-full bg-red-500 rounded-xl p-5 gap-2 text-white"
      style={{
        backgroundImage: `url('/assets/Background Saldo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="font-semibold">Saldo anda</p>

      <div className="h-full flex items-center gap-2">
        <p className="text-3xl font-semibold">Rp</p>

        {isLoading ? (
          <p className="text-3xl font-semibold animate-pulse">••••••••</p>
        ) : (
          <p className="text-3xl font-semibold">
            {isVisible ? balance : "••••••••"}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 ">
        <p className="font-semibold">Lihat Saldo</p>

        {isVisible ? (
          <MdVisibilityOff
            onClick={handleVisibilityToggle}
            className="cursor-pointer"
          />
        ) : (
          <MdVisibility
            onClick={handleVisibilityToggle}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default BalanceSection;
