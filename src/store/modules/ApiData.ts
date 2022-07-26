import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignPart2 {
  certNum: string;
  trCert: string;
  check1: string;
}

const initialState: SignPart2 = {
  certNum: "",
  trCert: "",
  check1: "",
};

export const UserApiData = createSlice({
  name: "UserApiData",
  initialState,
  reducers: {
    smsAuthenticationRequest: (state, action: PayloadAction<SignPart2>) => {
      state.certNum = action.payload.certNum;
      state.trCert = action.payload.trCert;
      state.check1 = action.payload.check1;
    },
  },
});

export const { smsAuthenticationRequest } = UserApiData.actions;

export default UserApiData.reducer;
