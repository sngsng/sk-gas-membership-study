import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import cls from "../util";

interface InputProps {
  HtmlFor: string;
  type?: "text" | "password" | "number";
  placeholder: string;
  label?: string;
  className?: string;
  errors?: string;
  maxLength?: number;
  register: UseFormRegisterReturn;
}

function Input({
  HtmlFor,
  type = "text",
  placeholder,
  label,
  className = "",
  errors,
  maxLength,
  register,
}: InputProps) {
  return (
    <label
      htmlFor={HtmlFor}
      className={cls("font-bold text-b3 focus-within:text-blue", className)}
    >
      {label && label}
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className="mt-8 label-input"
        {...register}
      />
      {errors && <p className="mt-8 error">{errors}</p>}
    </label>
  );
}

export default Input;
