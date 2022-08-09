import React from "react";
import { useAppSelector } from "../../store/hook";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";

export const MODAL_TYPES = {
  AlertModal: "AlertModal",
  ConfirmModal: "ConfirmModal",
} as const;

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.AlertModal]: AlertModal,
  [MODAL_TYPES.ConfirmModal]: ConfirmModal,
};

function GlobalModal() {
  const { modalType, modalProps } = useAppSelector((state) => state.modal);

  const renderComponents = () => {
    if (!modalType) {
      return null;
    }

    const ModalComponents = MODAL_COMPONENTS[modalType];

    return <ModalComponents {...modalProps} />;
  };

  return <>{renderComponents()}</>;
}

export default GlobalModal;
