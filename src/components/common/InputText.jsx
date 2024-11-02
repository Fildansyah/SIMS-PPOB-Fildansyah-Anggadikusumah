import React from "react";

const InputText = ({
  leftComponent,
  rightComponent,
  hasError,
  errorMessage,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div
        className={`flex p-3 border border-solid border-gray-300 rounded-md w-full items-center gap-2 ${
          hasError ? "border-red-500" : ""
        }`}
      >
        {leftComponent}
        <input className="w-full outline-none disabled:bg-white" {...props} />
        {rightComponent}
      </div>
      {hasError && (
        <p className="text-sm text-red-500 text-end">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputText;
