"use client";

import React from "react";
import { Slider } from "../common";

const PromoSection = () => {
  const payload = {
    status: 0,
    message: "Sukses",
    data: [
      {
        banner_name: "Banner 1",
        banner_image:
          "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-1.png",
        description: "Lerem Ipsum Dolor sit amet",
      },
      {
        banner_name: "Banner 2",
        banner_image:
          "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-2.png",
        description: "Lerem Ipsum Dolor sit amet",
      },
      {
        banner_name: "Banner 3",
        banner_image:
          "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-3.png",
        description: "Lerem Ipsum Dolor sit amet",
      },
      {
        banner_name: "Banner 4",
        banner_image:
          "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-4.png",
        description: "Lerem Ipsum Dolor sit amet",
      },
      {
        banner_name: "Banner 5",
        banner_image:
          "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-5.png",
        description: "Lerem Ipsum Dolor sit amet",
      },
    ],
  };

  const imageData = payload.data.map((item, index) => {
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
