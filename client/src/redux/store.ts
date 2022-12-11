import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { spotsSlice} from "./slices/spots";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    spots:spotsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
