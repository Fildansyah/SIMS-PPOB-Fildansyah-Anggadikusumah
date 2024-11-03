"use client";

import { useLoginMutation } from "../services/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../services/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [token, setToken] = useState(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      setIsTokenLoaded(true);
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const { data } = await login({ email, password }).unwrap();
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const isAuthenticated = async () => {
    if (!token) {
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

  const useAuthlessRedirect = () => {
    const router = useRouter();

    useEffect(() => {
      if (isTokenLoaded && !isAuthenticated()) {
        router.push("/login");
      }
    }, [router, isTokenLoaded, token]);
  };

  const useAuthRedirect = () => {
    const router = useRouter();
    useEffect(() => {
      if (isTokenLoaded && isAuthenticated()) {
        router.push("/");
      }
    }, [router, isTokenLoaded, token]);
  };

  return {
    loginUser,
    isLoading,
    error,
    logoutUser,
    isAuthenticated,
    useAuthlessRedirect,
    useAuthRedirect,
  };
};
