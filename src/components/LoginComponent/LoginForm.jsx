"use client";

import React, { useState } from "react";
import { Button, InputText } from "@/components";
import {
  MdAlternateEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const LoginForm = ({ loginData, isError, isLoading }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const passwordVisibility = passwordVisible ? (
    <MdVisibilityOff
      size={16}
      color="gray"
      onClick={() => setPasswordVisible(false)}
    />
  ) : (
    <MdVisibility
      size={16}
      color="gray"
      onClick={() => setPasswordVisible(true)}
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    loginData(data);
  };

  return (
    <form className="w-[60%] flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <InputText
          leftComponent={
            <MdAlternateEmail size={14} color={data.email ? "black" : "gray"} />
          }
          placeholder="masukan email anda"
          type="email"
          id="email"
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <InputText
          leftComponent={
            <MdLock
              size={14}
              color={isError() ? "red" : data.password ? "black" : "gray"}
            />
          }
          type={passwordVisible ? "text" : "password"}
          placeholder="masukan password anda"
          id="password"
          rightComponent={passwordVisibility}
          value={data.password}
          hasError={isError()}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
      >
        {isLoading ? "Loading..." : "Masuk"}
      </Button>
    </form>
  );
};

export default LoginForm;
