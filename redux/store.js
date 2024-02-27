import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
    },
  });
};
