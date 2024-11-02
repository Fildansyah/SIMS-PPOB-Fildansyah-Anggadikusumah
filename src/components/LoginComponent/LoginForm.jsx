"use client";

import React, { useState } from "react";
import { Button, InputText } from "@/components";
import {
  MdAlternateEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useAuth } from "@/GlobalRedux/auth/authHooks";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser } = useAuth();
  const [loginData, setLoginData] = useState({
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
    loginUser(loginData.email, loginData.password);
  };

  return (
    <form className="w-[60%] flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <InputText
          leftComponent={
            <MdAlternateEmail
              size={14}
              color={loginData.email ? "black" : "gray"}
            />
          }
          placeholder="masukan email anda"
          type="email"
          id="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <InputText
          leftComponent={
            <MdLock size={14} color={loginData.password ? "black" : "gray"} />
          }
          type={passwordVisible ? "text" : "password"}
          placeholder="masukan password anda"
          id="password"
          rightComponent={passwordVisibility}
          value={loginData.password}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
      >
        Masuk
      </Button>
    </form>
  );
};

export default LoginForm;
