import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../../elements/Button";

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
  btnText: string;
}

function LabelInputBtn({
  HtmlFor,
  type = "text",
  placeholder,
  label,
  // className = "",
  errors,
  maxLength,
  register,
  isLoading = false,
  btnText,
}: LabelInputBtnProps) {
  return (
    <>
      <label
        htmlFor={HtmlFor}
        className="block mb-8 mb-12 font-bold min-h-60 text-b3"
      >
        {label}
        <div className="flex">
          <input
            id={HtmlFor}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full max-w-329 label-input "
            {...register}
          />

          <div className="flex items-center justify-center min-w-100 min-h-60">
            {isLoading ? (
              <ClipLoader className="text-blue" color="text-blue" size={30} />
            ) : (
              <Button
                className="ml-10 min-h-60 text-b1 min-w-101"
                text={btnText}
                checked={false}
                onClick={() => {
                  console.log("111");
                }}
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
