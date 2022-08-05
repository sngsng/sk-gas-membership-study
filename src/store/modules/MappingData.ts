import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Terms } from "../../apis/signUp/types/responses";

interface SignPart2DataMappingType {
  birthday: string;
  name: string;
  gen: "0" | "1";
  phoneNo: string;
  phoneCorp: { value: string; label: string };
  nation: string;
  termsCheckList: Terms[];
  terms1chk?: string;
  terms2chk?: string;
  terms3chk?: string;
  terms4chk?: string;
}

const initialState: SignPart2DataMappingType = {
  name: "",
  phoneNo: "",
  gen: "0",
  phoneCorp: { value: "", label: "" },
  nation: "0",
  birthday: "",
  termsCheckList: [],
  terms1chk: "",
  terms2chk: "",
  terms3chk: "",
  terms4chk: "",
};

export const MappingData = createSlice({
  name: "MappingData",
  initialState,
  reducers: {
    SignPart2DataMapping: (
      state,
      action: PayloadAction<SignPart2DataMappingType>
    ) => {
      state.name = action.payload.name;
      state.phoneNo = action.payload.phoneNo;
      state.gen = action.payload.gen;
      state.phoneCorp = action.payload.phoneCorp;
      state.nation = action.payload.nation;
      state.birthday = action.payload.birthday;
      state.termsCheckList = action.payload.termsCheckList;
    },
    mappingDataReset: (state) => {
      state.name = "";
      state.phoneNo = "";
      state.gen = "0";
      state.phoneCorp = { value: "", label: "" };
      state.nation = "0";
      state.birthday = "";
      state.termsCheckList = [];
      state.terms1chk = "";
      state.terms2chk = "";
      state.terms3chk = "";
      state.terms4chk = "";
    },
  },
});

export const { SignPart2DataMapping, mappingDataReset } = MappingData.actions;

export default MappingData.reducer;
