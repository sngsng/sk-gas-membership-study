import { configureStore } from "@reduxjs/toolkit";
import UserApiDataReducer from "./modules/ApiData";
import UserReducer from "./modules/User";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    userApiData: UserApiDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
