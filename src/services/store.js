import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import authReducer from "./auth/authSlice";
import { balanceApi } from "./balance/balanceApi";
import { informationApi } from "./information/informationApi";
import { transactionApi } from "./transaction/transactionApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [informationApi.reducerPath]: informationApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      balanceApi.middleware,
      informationApi.middleware,
      transactionApi.middleware,
    ),
});

export const selectAuthState = (state) => state.auth;
