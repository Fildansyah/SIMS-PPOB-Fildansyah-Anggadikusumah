import React from "react";
import logo from "../../../public/assets/Logo.png";
import Image from "next/image";

const Logo = ({ iconSize = 32, textSize = 24 }) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Image
        src={logo}
        alt="Logo"
        width={iconSize}
        height={iconSize}
        priority
      />
      <h1 style={{ fontSize: textSize }} className="font-semibold">
        SIMS PPOB
      </h1>
    </div>
  );
};

export default Logo;
