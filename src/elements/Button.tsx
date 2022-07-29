import React, { ButtonHTMLAttributes } from "react";
import cls from "../util";

interface ButtonProps {
  text: string;
  className: string;
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  checked?: boolean;
}

export default function Button({
  text = "",
  className = "",
  disabled = false,
  onClick,
  checked,
  ...res
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cls(
        "btn text-center",
        className,
        checked ? "btn-fill" : "btn-fill-disabled"
      )}
      disabled={disabled}
      onClick={onClick}
      {...res}
    >
      {text}
    </button>
  );
}
