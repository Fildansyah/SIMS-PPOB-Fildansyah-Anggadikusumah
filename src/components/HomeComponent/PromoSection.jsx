"use client";

import React from "react";
import { Slider } from "../common";
import { useGetBannersQuery } from "@/services/information/informationApi";

const PromoSection = () => {
  const { data, isLoading, error } = useGetBannersQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <p className="font-semibold">Temukan promo menarik</p>

        <div className="flex  gap-10">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-[450px] h-[60px] rounded-xl bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p>Failed to load banners. Please try again later.</p>
      </div>
    );
  }

  console.log(data);

  const imageData = data?.data.map((item) => {
    return item.banner_image;
  });

  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold">Temukan promo menarik</p>

      <Slider images={imageData} />
    </div>
  );
};

export default PromoSection;
