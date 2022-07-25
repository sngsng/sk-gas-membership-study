import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Terms } from "../../apis/signUp/types/responses";
import { UserData1, UserData2, UserData3 } from "./types/signUp";
// import type { RootState } from "../index";

// 상태의 유형 정의

interface UserState extends UserData1, UserData2, UserData3 {
  // 약관동의 목록
  cluAgrList?: Terms[];
}

// 해당 유형을 사용하여 초기 상태 정의
const initialState: UserState = {
  iognId: "",
  iognPwd: "",
  ci: "",
  carFrtNo: "",
  carTbkNo: "",
  carManufrCd: "",
  carModelCd: "",
  mbrNm: "",
  hpNo: "",
  birth: "",
  gen: "",
  ntnl: "",
  mbrFg: "",
  prnBizlcNo: "",
  cluAgrList: [
    // {
    //   cluCd: "",
    //   cluVer: "",
    //   mndtAgrYn: "",
    // },
  ],
};

// `createSlice`는 `initialState` 인수에서 상태 유형을 유추한다.
export const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    addCluAgrList: (state, action: PayloadAction<Terms[]>) => {
      console.log("스테이트 : ", state.cluAgrList, "액션 : ", action);
      state.cluAgrList = action.payload;
    },
    signPart1DataAdd: (state, action: PayloadAction<UserState>) => {
      console.log("state ; ", state, "action : ", action);
      state.iognId = action.payload.iognId;
      state.iognPwd = action.payload.iognPwd;
      state.carFrtNo = action.payload.carFrtNo;
      state.carTbkNo = action.payload.carTbkNo;
    },
  },
});

export const { addCluAgrList, signPart1DataAdd } = User.actions;

// 선택기와 같은 다른 코드는 가져온 `RootState` 유형을 사용할 수 있습니다.
// export const selet = (state: RootState) => state.user.value;

export default User.reducer;
