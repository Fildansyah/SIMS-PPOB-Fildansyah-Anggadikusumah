"use client";

import React, { useLayoutEffect } from "react";
import {
  BalanceSection,
  Navbar,
  ProfileSection,
  PromoSection,
  ServicesSection,
} from "@/components";
import { useAuth } from "@/GlobalRedux/auth/authHooks";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="h-screen flex flex-col w-full ">
      <Navbar />
      <div className="flex flex-col w-full px-52 py-10 gap-10">
        <div className="flex flex-row gap-5">
          <ProfileSection />
          <BalanceSection />
        </div>

        <div className="flex flex-col gap-14 ">
          <ServicesSection />

          <PromoSection />
        </div>
      </div>
    </div>
  );
}
