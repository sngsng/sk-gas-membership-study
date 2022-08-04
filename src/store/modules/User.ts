import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "./types/user";

const initialState: UserDataType = {
  CI: "",
  carNo1: "",
  carNo2: "",
  favoriteChargePlace: [],
  favoriteChargePlaceCnt: 0,
  loginID: "",
  lvlCd: "01",
  mbrID: "",
  mbrNM: "",
  prnBizYn: "N",
};

export const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    userSignUpData: (state, action: PayloadAction<UserDataType>) => {
      console.log("============state, action===============");
      console.log("s", state, "a", action);
      state.CI = action.payload.CI;
      state.loginID = action.payload.loginID;
      state.carNo1 = action.payload.carNo1;
      state.carNo2 = action.payload.carNo2;
      state.mbrNM = action.payload.mbrNM;
      state.mbrID = action.payload.mbrID;
    },
  },
});

export const { userSignUpData } = User.actions;

export default User.reducer;
