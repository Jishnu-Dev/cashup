import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userId = action?.payload?.merchant_id;
      state.token = action?.payload?.token;
      state.isLoggedIn = action?.payload?.is_logged_in;
    },
    logoutUser: () => initialState,
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
