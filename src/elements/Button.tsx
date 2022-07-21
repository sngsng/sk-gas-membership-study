import React, { ButtonHTMLAttributes } from "react";
import cls from "../util";

interface ButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export default function Button({
  text = "",
  className = "",
  disabled = false,
  onClick,
  ...res
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cls("btn", className, "text-center")}
      disabled={disabled}
      onClick={onClick}
      {...res}
    >
      {text}
    </button>
  );
}
