"use client";

import React, { useState } from "react";
import { Button, InputText } from "@/components";
import {
  MdAlternateEmail,
  MdLock,
  MdOutlinePerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const RegistrationForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

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

  const repeatPasswordVisibility = repeatPasswordVisible ? (
    <MdVisibilityOff
      size={16}
      color="gray"
      onClick={() => setRepeatPasswordVisible(false)}
    />
  ) : (
    <MdVisibility
      size={16}
      color="gray"
      onClick={() => setRepeatPasswordVisible(true)}
    />
  );

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
    <form className="w-[60%] flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <InputText
          leftComponent={<MdAlternateEmail size={14} color="gray" />}
          placeholder="masukan email anda"
          type="email"
          id="email"
          name="email"
        />
        <InputText
          leftComponent={<MdOutlinePerson size={14} color="gray" />}
          placeholder="nama anda"
          type="text"
          id="first_name"
          name="first_name"
        />
        <InputText
          leftComponent={<MdOutlinePerson size={14} color="gray" />}
          placeholder="nama belakang"
          type="text"
          id="last_name"
          name="last_name"
        />
        <InputText
          leftComponent={<MdLock size={14} color="gray" />}
          type={passwordVisible ? "text" : "password"}
          placeholder="masukan password anda"
          id="password"
          name="password"
          rightComponent={passwordVisibility}
        />
        <InputText
          leftComponent={<MdLock size={14} color="gray" />}
          type={repeatPasswordVisible ? "text" : "password"}
          placeholder="konfirmasi password anda"
          id="password"
          name="password"
          rightComponent={repeatPasswordVisibility}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
      >
        Registrasi
      </Button>
    </form>
  );
};

export default RegistrationForm;
