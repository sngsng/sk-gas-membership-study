import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import cls from "../../util";

interface LabelInputProps {
  HtmlFor: string;
  type?: "text" | "password" | "number" | "checkBox";
  placeholder: string;
  label?: string;
  className?: string;
  errors?: string;
  maxLength?: number;
  register: UseFormRegisterReturn;
}

// useForm Input용   *** React-hook-form ***
function LabelInput({
  HtmlFor,
  type = "text",
  placeholder,
  label,
  className = "",
  errors,
  maxLength,
  register,
}: LabelInputProps) {
  return (
    <label
      htmlFor={HtmlFor}
      className={cls(
        "font-bold text-b3 focus-within:text-blue block",
        className
      )}
    >
      {label && label}
      <input
        id={HtmlFor}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full mt-8 label-input"
        {...register}
      />
      {errors && <p className="mt-8 error">{errors}</p>}
    </label>
  );
}

export default LabelInput;
