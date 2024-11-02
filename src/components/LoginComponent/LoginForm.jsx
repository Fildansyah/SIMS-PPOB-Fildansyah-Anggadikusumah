"use client";

import React, { useState } from "react";
import { Button, InputText } from "@/components";
import {
  MdAlternateEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
  };

  return (
    <form className="w-full flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <InputText
          startChild={<MdAlternateEmail size={14} color="gray" />}
          placeholder="masukan email anda"
          type="email"
          id="email"
          name="email"
        />
        <InputText
          startChild={<MdLock size={14} color="gray" />}
          type={passwordVisible ? "text" : "password"}
          placeholder="masukan password anda"
          id="password"
          name="password"
          endChild={
            passwordVisible ? (
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
            )
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
