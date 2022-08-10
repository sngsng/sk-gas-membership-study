/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserApiDataReducer from "./modules/ApiData";
import SignUpReducer from "./modules/SignUp";
import MappingDataReducer from "./modules/MappingData";
import UserReducer from "./modules/User";
import ModalReducer from "./modules/Modal";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  signUp: SignUpReducer,
  userApiData: UserApiDataReducer,
  mappingData: MappingDataReducer,
  user: UserReducer,
  modal: ModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // }).concat(logger),
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
