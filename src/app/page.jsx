import React from "react";
import {
  BalanceSection,
  Navbar,
  ProfileSection,
  PromoSection,
  ServicesSection,
} from "@/components";

export default function Home() {
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
