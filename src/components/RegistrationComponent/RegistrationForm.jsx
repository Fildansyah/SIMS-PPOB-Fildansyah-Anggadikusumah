"use client";

import React, { useEffect, useState } from "react";
import { Button, InputText } from "@/components";
import {
  MdAlternateEmail,
  MdLock,
  MdOutlinePerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectRegistrationState } from "@/services/store";
import {
  resetFormError,
  setFormError,
  setNotification,
  setRegisterData,
  setRegistStatus,
} from "@/services/registration/registrationSlice";
import { useRegistrationMutation } from "@/services/registration/registrationApi";

const RegistrationForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const { registerData, formError } = useSelector(selectRegistrationState);
  const [registration, { isLoading, isSuccess, isError }] =
    useRegistrationMutation();
  const dispatch = useDispatch();

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(registerData.email)) {
      dispatch(
        setFormError({
          type: "email",
          message: "tolong masukan email yang valid",
        }),
      );
      return;
    } else {
      dispatch(resetFormError());
    }

    if (registerData.password !== registerData.repeat_password) {
      dispatch(
        setFormError({
          type: "repeat_password",
          message: "password tidak sama",
        }),
      );
      return;
    } else if (registerData.password.length < 8) {
      dispatch(
        setFormError({
          type: "password",
          message: "password minimal 8 karakter",
        }),
      );
      return;
    } else {
      dispatch(resetFormError());
    }

    registration(registerData);
    console.log("submit", registerData);
  };

  const handleEmailChange = (e) => {
    dispatch(setRegisterData({ ...registerData, email: e.target.value }));
  };

  const handleFirstNameChange = (e) => {
    dispatch(setRegisterData({ ...registerData, first_name: e.target.value }));
  };

  const handleLastNameChange = (e) => {
    dispatch(setRegisterData({ ...registerData, last_name: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    dispatch(setRegisterData({ ...registerData, password: e.target.value }));
  };

  const handleRepeatPasswordChange = (e) => {
    dispatch(
      setRegisterData({ ...registerData, repeat_password: e.target.value }),
    );
  };

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(setRegistStatus(isSuccess ? "success" : "failed"));
      dispatch(setNotification(true));
    }
  }, [isError, isSuccess, dispatch]);

  return (
    <form className="w-[60%] flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <InputText
          leftComponent={
            <MdAlternateEmail
              size={14}
              color={registerData.email ? "black" : "gray"}
            />
          }
          placeholder="masukan email anda"
          type="email"
          value={registerData.email}
          onChange={handleEmailChange}
          hasError={formError.type === "email"}
          errorMessage={formError.message}
        />
        <InputText
          leftComponent={
            <MdOutlinePerson
              size={14}
              color={registerData.first_name ? "black" : "gray"}
            />
          }
          placeholder="nama anda"
          type="text"
          value={registerData.first_name}
          onChange={handleFirstNameChange}
        />
        <InputText
          leftComponent={
            <MdOutlinePerson
              size={14}
              color={registerData.last_name ? "black" : "gray"}
            />
          }
          placeholder="nama belakang"
          type="text"
          value={registerData.last_name}
          onChange={handleLastNameChange}
        />
        <InputText
          leftComponent={
            <MdLock
              size={14}
              color={registerData.password ? "black" : "gray"}
            />
          }
          type={passwordVisible ? "text" : "password"}
          value={registerData.password}
          placeholder="masukan password anda"
          rightComponent={passwordVisibility}
          onChange={handlePasswordChange}
          hasError={formError.type === "password"}
          errorMessage={formError.message}
        />
        <InputText
          leftComponent={
            <MdLock
              size={14}
              color={registerData.repeat_password ? "black" : "gray"}
            />
          }
          type={repeatPasswordVisible ? "text" : "password"}
          value={registerData.repeat_password}
          placeholder="konfirmasi password anda"
          rightComponent={repeatPasswordVisibility}
          hasError={formError.type === "repeat_password"}
          errorMessage={formError.message}
          onChange={handleRepeatPasswordChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 hover:shadow-md transition-all"
        disabled={isLoading}
      >
        Registrasi
      </Button>
    </form>
  );
};

export default RegistrationForm;
