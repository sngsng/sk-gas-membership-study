/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from "react";
import Button from "../../elements/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook";
// import { closeModal } from "../../store/modules/Modal";
import cls from "../../util";

interface IBaseModal {
  children?: ReactNode;
  className?: string;
  closeHandle: () => void;
}

// LayOut 이라고 생각하고..!
function BaseModal({ children, className = "", closeHandle }: IBaseModal) {
  return (
    <>
      <div
        className={cls(
          "absolute top-0 bottom-0 left-0 right-0 wrap-center",
          className
        )}
        aria-hidden="true"
        onClick={closeHandle}
      >
        <div
          className="modal"
          aria-hidden="true"
          onClick={(e) => {
            // 이벤트 버블링 방지
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default BaseModal;
