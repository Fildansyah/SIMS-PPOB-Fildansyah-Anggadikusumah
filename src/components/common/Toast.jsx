"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const Toast = ({ isVisible, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  return (
    <div
      className={`bg-red-100 px-3 py-1 rounded-lg flex items-center justify-between absolute bottom-[10%] w-[40%] text-center text-white transition-all duration-500 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <p className="text-red-500 font-semibold">{message}</p>

      <MdOutlineClose
        size={20}
        className="cursor-pointer"
        color="red"
        onClick={() => setVisible(false)}
      />
    </div>
  );
};

export default Toast;
