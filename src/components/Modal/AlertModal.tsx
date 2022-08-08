/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import string from "../../constants/string";
import Button from "../../elements/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../store/modules/Modal";
import BaseModal from "./BaseModal";

interface IAlertModal {
  // type?: "alertModal" | "confirmModal" | "baseModal";
  title: string;
  subTitle?: string;
  className?: string;
  closeModal: () => void;
  isModal?: boolean;
}

function AlertModal({
  title,
  subTitle,
  closeModal,
  className = "",
  isModal,
}: IAlertModal) {
  return (
    <BaseModal isModal={isModal} className={className}>
      {title && <p className="mb-8 font-semibold">{title}</p>}
      {subTitle && <p className="mb-12 text-b1">{subTitle}</p>}

      <Button
        className="p-12 "
        text={string.Check}
        isBtnCheck
        setFocus
        onClick={closeModal}
      />
    </BaseModal>
  );
}

export default AlertModal;
