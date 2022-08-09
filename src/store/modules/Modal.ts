import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertModalProps } from "../../components/Modal/AlertModal";
import { ConfirmModalProps } from "../../components/Modal/ConfirmModal";

export interface IModal {
  modalType: "ConfirmModal" | "AlertModal" | null;
  modalProps: ConfirmModalProps | AlertModalProps | null;
}

const initialState: IModal = {
  modalType: null,
  modalProps: null,
};

const Modal = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<IModal>) => {
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
  },
});

export const { setModal } = Modal.actions;

export default Modal.reducer;
