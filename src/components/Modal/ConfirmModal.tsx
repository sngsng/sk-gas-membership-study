/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Button from "../../elements/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import BaseModal from "./BaseModal";

export interface ConfirmModalProps {
  title: string;
  message?: string;
  className?: string;
  firstFocus?: boolean;
  secondFocus?: boolean;
  isBtnCheck?: boolean;
  firstBtnType?: "fill" | "line";
  firstBtnText?: string;
  secondBtnType?: "fill" | "line";
  secondBtnText?: string;
  onClickFirstHandle: () => void;
  onClickSecondHandle: () => void;
  closeHandle: () => void;
}

function ConfirmModal({
  title,
  message,
  firstFocus = true,
  secondFocus = false,
  isBtnCheck = true,
  className = "",
  firstBtnType = "fill",
  firstBtnText,
  secondBtnType = "line",
  secondBtnText,
  onClickFirstHandle,
  onClickSecondHandle,
  closeHandle,
}: ConfirmModalProps) {
  return (
    <BaseModal className={className} closeHandle={closeHandle}>
      {title && <p className="mb-8 font-semibold">{title}</p>}
      {message && <p className="mb-12">{message}</p>}

      <Button
        className="p-12 "
        text={firstBtnText || "확인"}
        type={firstBtnType}
        isBtnCheck={isBtnCheck}
        setFocus={firstFocus}
        onClick={onClickFirstHandle}
      />

      <Button
        className="p-12 mt-12"
        text={secondBtnText || "취소"}
        type={secondBtnType}
        isBtnCheck={isBtnCheck}
        setFocus={secondFocus}
        onClick={onClickSecondHandle}
      />
    </BaseModal>
  );
}
export default ConfirmModal;
