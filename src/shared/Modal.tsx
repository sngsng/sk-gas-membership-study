/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Button from "../elements/Button";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { closeModal } from "../store/modules/Modal";

function Modal() {
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
    <>
      {isModal && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0 "
          aria-hidden="true"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          <div className="wrap-center ">
            <div
              className="modal"
              aria-hidden="true"
              onClick={(e) => {
                // 이벤트 버블링 방지
                e.stopPropagation();
              }}
            >
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
