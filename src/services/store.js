import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transaction/transactionSlice";
import registrationReducer from "./registration/registrationSlice";

import { authApi } from "./auth/authApi";
import { balanceApi } from "./balance/balanceApi";
import { informationApi } from "./information/informationApi";
import { transactionApi } from "./transaction/transactionApi";
import { registrationApi } from "./registration/registrationApi";
import { profileApi } from "./profile/profileApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    transaction: transactionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [informationApi.reducerPath]: informationApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      balanceApi.middleware,
      informationApi.middleware,
      transactionApi.middleware,
      registrationApi.middleware,
      profileApi.middleware,
    ),
});

export const selectAuthState = (state) => state.auth;
export const selectRegistrationState = (state) => state.registration;
export const selectTransactionState = (state) => state.transaction;
