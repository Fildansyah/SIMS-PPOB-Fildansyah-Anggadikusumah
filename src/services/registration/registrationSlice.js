import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerData: {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    repeat_password: "",
  },
  formError: {
    type: "",
    message: "",
  },
  notification: false,
  registStatus: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    setFormError: (state, action) => {
      state.formError = action.payload;
    },
    resetFormError: (state) => {
      state.formError = initialState.formError;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setRegistStatus: (state, action) => {
      state.registStatus = action.payload;
    },
  },
});

export const {
  setRegisterData,
  setFormError,
  resetFormError,
  setNotification,
  setRegistStatus,
} = registrationSlice.actions;

export default registrationSlice.reducer;
