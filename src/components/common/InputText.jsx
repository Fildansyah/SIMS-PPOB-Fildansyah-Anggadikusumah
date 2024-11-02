import React from "react";

const InputText = ({ startChild, endChild, hasError, ...props }) => {
  return (
    <div
      className={`flex p-3 border border-solid border-gray-300 rounded-md w-full items-center gap-2 ${
        hasError ? "border-red-500" : ""
      }`}
    >
      {startChild}
      <input className="w-full outline-none" {...props} />
      {endChild}
    </div>
  );
};

export default InputText;
