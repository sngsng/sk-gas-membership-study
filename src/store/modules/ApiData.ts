import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignPart2 {
  certNum: string;
  trCert?: string;
  check1: string;
  check2: string;
}

export interface SignPart3 extends SignPart2 {
  check3: string;
}

const initialState: SignPart3 = {
  certNum: "",
  trCert: "",
  check1: "",
  check2: "",
  check3: "",
};

export const UserApiData = createSlice({
  name: "UserApiData",
  initialState,
  reducers: {
    signUpPartApiData2: (state, action: PayloadAction<SignPart2>) => {
      state.certNum = action.payload.certNum;
      state.trCert = action.payload.trCert;
      state.check1 = action.payload.check1;
      state.check2 = action.payload.check2;
    },
    signUpPartApiData3: (state, action: PayloadAction<SignPart3>) => {
      state.check1 = action.payload.check1;
      state.check2 = action.payload.check2;
      state.check3 = action.payload.check3;
      state.certNum = action.payload.certNum;
    },
  },
});

export const { signUpPartApiData2, signUpPartApiData3 } = UserApiData.actions;

export default UserApiData.reducer;
