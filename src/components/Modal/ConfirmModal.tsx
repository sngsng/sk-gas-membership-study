/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Button from "../../elements/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../store/modules/Modal";
import BaseModal from "./BaseModal";

function AlertModal() {
  const {
    isModal,
    cancelLabel,
    checkLabel,
    subTitle,
    title,
    checkType,
    cancelType,
    checkFocus,
    cancelFocus,
  } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <BaseModal isModal>
      {title && <p className="mb-8 font-semibold">{title}</p>}
      {subTitle && <p className="mb-12">{subTitle}</p>}
      {checkLabel && (
        <Button
          className="p-12 "
          text={checkLabel}
          type={checkType}
          isBtnCheck
          setFocus={checkFocus}
          onClick={() => {
            console.log("확인");
            dispatch(closeModal());
          }}
        />
      )}
      {cancelLabel && (
        <Button
          className="p-12 mt-12"
          text={cancelLabel}
          type={cancelType}
          isBtnCheck
          setFocus={cancelFocus}
          onClick={() => {
            console.log("취소");
            dispatch(closeModal());
          }}
        />
      )}
    </BaseModal>
  );
}

export default AlertModal;
