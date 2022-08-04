import React from "react";
import { ClipLoader } from "react-spinners";
import cls from "../util";

interface ButtonProps {
  text: string;
  className: string;
  disabled?: boolean;
  type?: "fill" | "line";
  onClick?: () => void;
  isBtnCheck?: boolean;
  isLoading?: boolean;
  LoadingColor?: string;
}

export default function Button({
  text = "",
  className = "",
  disabled = false,
  type = "fill",
  onClick,
  isBtnCheck,
  isLoading,
  LoadingColor = "white",
  ...res
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cls(
        "btn text-center",
        className,
        isBtnCheck ? `btn-${type}` : `btn-${type}-disabled`
      )}
      disabled={disabled}
      onClick={onClick}
      {...res}
    >
      {isLoading ? (
        <div className="flex items-center justify-center max-h-20">
          <ClipLoader
            className={cls(`text-${LoadingColor}`)}
            color="text-white"
            size={25}
          />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
