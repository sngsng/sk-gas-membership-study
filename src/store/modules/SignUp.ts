import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Part2Data, Terms } from "../../apis/signUp/types/responses";
import { SignUpData1, SignUpData2, SignUpData3 } from "./types/signUp";

// 상태의 유형 정의

export interface SignUpState extends SignUpData1, SignUpData2, SignUpData3 {
  // 약관동의 목록
  cluAgrList?: Terms[];
}

// 해당 유형을 사용하여 초기 상태 정의
const initialState: SignUpState = {
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
  cluAgrList: [],
};

// `createSlice`는 `initialState` 인수에서 상태 유형을 유추한다.
export const SignUp = createSlice({
  name: "SignUp",
  initialState,
  reducers: {
    addCluAgrList: (state, action: PayloadAction<Terms[]>) => {
      state.cluAgrList = action.payload;
    },
    signPart1DataAdd: (state, action: PayloadAction<SignUpState>) => {
      state.iognId = action.payload.iognId;
      state.iognPwd = action.payload.iognPwd;
      state.carFrtNo = action.payload.carFrtNo;
      state.carTbkNo = action.payload.carTbkNo;
    },
    signPart2DataAdd: (state, action: PayloadAction<Part2Data>) => {
      state.birth = action.payload.birthday;
      state.gen = action.payload.gen;
      state.hpNo = action.payload.phoneNo;
      state.ntnl = action.payload.nation;
      state.mbrNm = action.payload.name;
    },
    signDataReset: (state) => {
      state.iognId = "";
      state.iognPwd = "";
      state.ci = "";
      state.carFrtNo = "";
      state.carTbkNo = "";
      state.carManufrCd = "";
      state.carModelCd = "";
      state.mbrNm = "";
      state.hpNo = "";
      state.birth = "";
      state.gen = "";
      state.ntnl = "";
      state.mbrFg = "";
      state.prnBizlcNo = "";
      state.cluAgrList = [];
    },
  },
});

export const {
  addCluAgrList,
  signPart1DataAdd,
  signPart2DataAdd,
  signDataReset,
} = SignUp.actions;

export default SignUp.reducer;
