import React from "react";
import Image from "next/image";
import { Logo } from "@/components";

export default function Login() {
  return (
    <div className="h-full flex">
      <div className="flex flex-1 flex-col items-center justify-center px-16 py-10">
        <div className="flex flex-col gap-4">
          <Logo />

          <h1 className="text-3xl max-w-[300px] text-center">
            Masuk atau buat akun untuk memulai
          </h1>
        </div>
      </div>
      <div className="flex-1 bg-pink-100"></div>
    </div>
  );
}
