// import React, { ButtonHTMLAttributes } from "react";
import React from "react";
import cls from "../util";

interface ButtonProps {
  text: string;
  className: string;
  disabled?: boolean;
  // onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onClick?: () => void;
  isBtnCheck?: boolean;
}

export default function Button({
  text = "",
  className = "",
  disabled = false,
  onClick,
  isBtnCheck,
  ...res
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cls(
        "btn text-center",
        className,
        isBtnCheck ? "btn-fill" : "btn-fill-disabled"
      )}
      disabled={disabled}
      onClick={onClick}
      {...res}
    >
      {text}
    </button>
  );
}
