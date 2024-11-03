import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openConfirmationModal: false,
  openNotificationModal: false,
  topUpAmount: "",
  topUpSuggestions: [
    { label: "Rp10.000", value: 10000 },
    { label: "Rp20.000", value: 20000 },
    { label: "Rp50.000", value: 50000 },
    { label: "Rp100.000", value: 100000 },
    { label: "Rp250.000", value: 250000 },
    { label: "Rp500.000", value: 500000 },
  ],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setOpenConfirmationModal: (state) => {
      state.openConfirmationModal = true;
    },
    setCloseConfirmationModal: (state) => {
      state.openConfirmationModal = false;
    },
    setOpenNotificationModal: (state) => {
      state.openNotificationModal = true;
    },
    SetCloseNotificationModal: (state) => {
      state.openNotificationModal = false;
    },
    setTopUpAmount: (state, action) => {
      state.topUpAmount = action.payload;
    },
  },
});

export const {
  setOpenConfirmationModal,
  setCloseConfirmationModal,
  setOpenNotificationModal,
  SetCloseNotificationModal,
  setTopUpAmount,
} = transactionSlice.actions;

export default transactionSlice.reducer;
