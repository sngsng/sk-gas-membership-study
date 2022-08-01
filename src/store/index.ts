import { configureStore } from "@reduxjs/toolkit";
import UserApiDataReducer from "./modules/ApiData";
import UserReducer from "./modules/User";
import MappingDataReducer from "./modules/MappingData";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    userApiData: UserApiDataReducer,
    mappingData: MappingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
