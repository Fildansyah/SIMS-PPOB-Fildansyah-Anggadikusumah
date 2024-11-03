"use client";

import React, { useLayoutEffect } from "react";
import { Logo, LoginForm, Toast } from "@/components";

import Image from "next/image";
import ilustrasi from "../../../public/assets/illustrasi_Login.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/authHooks";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, loginUser } = useAuth();

  useLayoutEffect(() => {
    if (isAuthenticated()) router.push("/");
  }, [isAuthenticated, router]);

  const isError = error !== undefined ? true : false;

  if (isAuthenticated()) {
    return null;
  }

  return (
    <div className="h-full flex relative">
      <div className="flex w-full gap-10 flex-col items-center justify-center px-[100px] py-10">
        <div className="flex flex-col gap-4">
          <Logo iconSize={24} />
          <h1 className="text-3xl max-w-[350px] text-center font-semibold">
            Masuk atau buat akun untuk memulai
          </h1>
        </div>
        <LoginForm
          loginData={(data) => loginUser(data.email, data.password)}
          isError={isError}
          isLoading={isLoading}
        />
        <p className="text-sm text-gray-500">
          Belum punya akun? registrasi{" "}
          <span
            onClick={() => router.push("/registration")}
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            di sini
          </span>
        </p>
        <Toast isVisible={isError} message={error?.data?.message} />
      </div>
      <div className="w-full h-full relative bg-[#fff2f0]">
        <Image src={ilustrasi} alt="login" fill className="object-cover" />
      </div>
    </div>
  );
}
