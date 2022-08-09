/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Button from "../../elements/Button";
import BaseModal from "./BaseModal";

export interface AlertModalProps {
  title: string;
  message?: string;
  btnText?: string;
  className?: string;
  isBtnCheck?: boolean;
  closeHandle: () => void;
  btnHandle: () => void;
}

function AlertModal({
  title,
  message,
  btnText,
  isBtnCheck = true,
  className = "",
  closeHandle,
  btnHandle,
}: AlertModalProps) {
  return (
    <BaseModal className={className} closeHandle={closeHandle}>
      {title && <p className="mb-8 font-semibold">{title}</p>}
      {message && <p className="mb-12 text-b1">{message}</p>}

      <Button
        className="p-12 "
        text={btnText || "확인"}
        isBtnCheck={isBtnCheck}
        setFocus
        onClick={btnHandle}
      />
    </BaseModal>
  );
}

export default AlertModal;
