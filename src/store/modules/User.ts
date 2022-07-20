import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../index";

// 상태의 유형 정의
interface UserState {
  // 로그인ID
  iognId: string;

  //로그인비밀번호
  iognPwd: string;

  // 고객 CI
  ci: string;

  // 차량 앞번호
  carFrtNo: string;

  // 차량 뒤번호
  carTbkNo: string;

  // 차량 제조사코드
  carManufrCd: string;

  // 차량 모델코드
  carModelCd: string;

  // 회원명
  mbrNm: string;

  // 휴대폰번호
  hpNo: string;

  // 생년월일
  birth: string;

  // 성별
  gen: string;

  // 국적
  ntnl: string;

  // 회원구분
  mbrFg: string;

  // 개인사업자번호
  prnBizlcNo?: string;

  // 약관동의 목록
  cluAgrList: CluAgrList[];
}

interface CluAgrList {
  // 약관코드
  cluCd: string;

  // 약관버전
  cluVer: string;

  // 동의여부
  agrYn: string;
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
    {
      cluCd: "",
      cluVer: "",
      agrYn: "",
    },
  ],
};

// `createSlice`는 `initialState` 인수에서 상태 유형을 유추한다.
export const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // state.value += 1;
    //   state.value += "가";
    // },
    // decrement: (state) => {
    //   // state.value -= 1;
    //   state.value = "";
    // },
    // // PayloadAction 유형을 사용하여 `action.payload`의 내용을 선언합니다.
    // incrementByAmount: (state, action: PayloadAction<string>) => {
    //   state.value += action.payload;
    // },

    // 이게 맞는거
    // addCluAgrList: (state, action: PayloadAction<CluAgrList[]>) => {
    addCluAgrList: (state, action: PayloadAction<CluAgrList[]>) => {
      console.log("스테이트 : ", state.cluAgrList, "액션 : ", action);
      state.cluAgrList = action.payload;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = User.actions;
export const { addCluAgrList } = User.actions;

// 선택기와 같은 다른 코드는 가져온 `RootState` 유형을 사용할 수 있습니다.
// export const selet = (state: RootState) => state.user.value;

export default User.reducer;
