import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: {
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { logout, setProfileData } = authSlice.actions;
export default authSlice.reducer;
