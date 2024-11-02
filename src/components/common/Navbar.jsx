"use client";

import React from "react";
import { Logo } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Top Up",
      link: "/topup",
    },
    {
      name: "Transaction",
      link: "/transaction",
    },
    {
      name: "Akun",
      link: "/akun",
    },
  ];

  return (
    <header className="flex items-center justify-between px-52 py-5 border-b">
      <Logo iconSize={32} textSize={24} />

      <div className="flex gap-10 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className={`hover:text-red-600 ${
              pathname === item.link && "text-red-600 font-semibold"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
