// import React, { ButtonHTMLAttributes } from "react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../../elements/Button";
import cls from "../../util";

interface LabelInputBtnProps {
  HtmlFor: string;
  type?: "text" | "password" | "number" | "checkBox";
  placeholder: string;
  label?: string;
  className?: string;
  errors?: string;
  maxLength?: number;
  register: UseFormRegisterReturn;
  isLoading: boolean;
  isBtnCheck: boolean;
  btnText: string;
  // onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onClick?: () => void;
}

function LabelInputBtn({
  HtmlFor,
  type = "text",
  placeholder,
  label,
  className = "",
  errors,
  maxLength,
  register,
  isLoading = false,
  btnText,
  isBtnCheck,
  onClick,
}: LabelInputBtnProps) {
  return (
    <>
      <label
        htmlFor={HtmlFor}
        className={cls(
          "block mb-8 mb-12 font-bold min-h-60 text-b3",
          className
        )}
      >
        {label}
        <div className="flex mt-8">
          <input
            id={HtmlFor}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full max-w-329 label-input "
            {...register}
          />

          <div className="flex items-center justify-center min-h-60">
            {isLoading ? (
              <ClipLoader
                className="text-blue ml-45"
                color="text-blue"
                size={30}
              />
            ) : (
              <Button
                className="ml-10 min-h-60 text-b1 min-w-101"
                text={btnText}
                disabled={!isBtnCheck}
                isBtnCheck={isBtnCheck}
                onClick={onClick}
              />
            )}
          </div>
        </div>
        {errors && <p className="mt-8 error">{errors}</p>}
      </label>
    </>
  );
}

export default LabelInputBtn;
