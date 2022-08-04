import { configureStore } from "@reduxjs/toolkit";
import UserApiDataReducer from "./modules/ApiData";
import SignUpReducer from "./modules/SignUp";
import MappingDataReducer from "./modules/MappingData";
import UserReducer from "./modules/User";

export const store = configureStore({
  reducer: {
    signUp: SignUpReducer,
    userApiData: UserApiDataReducer,
    mappingData: MappingDataReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
