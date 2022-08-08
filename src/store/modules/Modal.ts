import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  isModal?: boolean;
  checkType?: "fill" | "line";
  cancelType?: "fill" | "line";

  title?: string;
  subTitle?: string;
  checkLabel?: string;
  cancelLabel?: string;
  checkFocus?: boolean;
  cancelFocus?: boolean;
}

const initialState: IModal = {
  isModal: false,
  checkType: "fill",
  cancelType: "fill",

  title: "",
  subTitle: "",
  checkLabel: "",
  cancelLabel: "",
  checkFocus: false,
  cancelFocus: false,
};

const Modal = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    openModal: (state, actions: PayloadAction<IModal>) => {
      state.isModal = true;
      state.title = actions.payload.title;
      state.subTitle = actions.payload.subTitle;
      state.checkLabel = actions.payload.checkLabel;
      state.cancelLabel = actions.payload.cancelLabel;
      state.cancelType = actions.payload.cancelType;
      state.checkType = actions.payload.checkType;
      // focus는 한곳만 선택할수 있게!
      state.checkFocus = actions.payload.checkFocus;
      state.cancelFocus = actions.payload.cancelFocus;
    },
    closeModal: (state) => {
      state.isModal = false;
      state.title = "";
      state.subTitle = "";
      state.checkLabel = "";
      state.cancelLabel = "";
      state.cancelType = "fill";
      state.checkType = "fill";
      state.checkFocus = false;
      state.cancelFocus = false;
    },
  },
});

export const { openModal, closeModal } = Modal.actions;

export default Modal.reducer;
