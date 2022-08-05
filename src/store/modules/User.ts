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

  // 로그인 여부
  isLogin: false,
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
    userDataReset: (state) => {
      state.CI = "";
      state.carNo1 = "";
      state.carNo2 = "";
      state.favoriteChargePlace = [];
      state.favoriteChargePlaceCnt = 0;
      state.loginID = "";
      state.lvlCd = "01";
      state.mbrID = "";
      state.mbrNM = "";
      state.prnBizYn = "N";
      state.isLogin = false;
    },
  },
});

export const { userSignUpData, userDataReset } = User.actions;

export default User.reducer;
