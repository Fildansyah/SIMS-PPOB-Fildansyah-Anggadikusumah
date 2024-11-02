import React from "react";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 min-w-96 max-w-[90%]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
