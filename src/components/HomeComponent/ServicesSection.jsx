"use client";
import { useGetServicesQuery } from "@/services/information/informationApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ServicesSection = () => {
  const { data, isLoading, error } = useGetServicesQuery();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between gap-5">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="w-[70px] h-[70px] rounded-xl bg-gray-200 animate-pulse" />
            <div className="w-[90px] h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p>Failed to load services. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-5">
      {data?.data.map((item, index) => (
        <div
          onClick={() => router.push(`/pembayaran/${item.service_code}`)}
          key={index}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Image
            src={item.service_icon}
            alt={item.service_name}
            width={70}
            height={70}
            className="rounded-xl"
            unoptimized
          />

          <p className="text-sm max-w-[90px] text-center">
            {item.service_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
