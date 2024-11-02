"use client";

import { useLoginMutation } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { setToken, logout } from "./authSlice";
import { selectAuthState } from "../store";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { token } = useSelector(selectAuthState);

  const loginUser = async (email, password) => {
    try {
      const { data } = await login({ email, password }).unwrap();
      dispatch(setToken(data.token));
      console.log(data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const isAuthenticated = () => {
    if (!token) {
      console.log("No token found");
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) {
        return false;
      }
      const currentTime = Date.now() / 1000;

      return decoded.exp > currentTime;
    } catch (error) {
      console.log("Token decoding failed", error);
      return false;
    }
  };

  return {
    loginUser,
    logoutUser,
    isAuthenticated,
  };
};
