"use client";

import { Logo, RegistNotificationModal, RegistrationForm } from "@/components";
import Image from "next/image";
import React, { useLayoutEffect } from "react";
import ilustrasi from "../../../public/assets/illustrasi_Login.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/authHooks";

export default function Registration() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useLayoutEffect(() => {
    if (isAuthenticated()) router.push("/");
  }, [isAuthenticated, router]);

  if (isAuthenticated()) return null;

  return (
    <div className="h-full flex ">
      <div className="flex w-full gap-10 flex-col items-center justify-center px-[100px] py-10">
        <div className="flex flex-col gap-4">
          <Logo iconSize={24} />
          <h1 className="text-3xl max-w-[350px] text-center font-semibold">
            Lengkapi data untuk membuat akun
          </h1>
        </div>
        <RegistrationForm />
        <p
          onClick={() => router.push("/login")}
          className="text-sm text-gray-500"
        >
          sudah punya akun? login{" "}
          <span className="text-red-500 font-semibold cursor-pointer hover:underline">
            di sini
          </span>
        </p>
      </div>
      <div className="w-full h-full relative bg-[#fff2f0]">
        <Image src={ilustrasi} alt="login" fill className="object-cover" />
      </div>

      <RegistNotificationModal />
    </div>
  );
}
