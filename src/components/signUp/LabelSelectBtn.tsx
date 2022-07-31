import React from "react";
import { UseFormSetValue } from "react-hook-form";
import cls from "../../util";

interface LabelSelectBtnProps {
  label: string;
  name: string;
  value: string;
  choice1: string;
  choice2: string;
  setValue: UseFormSetValue<any>;
  // onChange?: (...event: any[]) => void;
}

function LabelSelectBtn({
  label,
  name,
  value,
  choice1,
  choice2,
  setValue,
}: LabelSelectBtnProps) {
  return (
    <div className="flex flex-col mb-20 font-bold text-b3 ">
      {label}
      <div className="flex w-full mt-8">
        <div
          className={cls(
            "btn-left  btn-extra btn-full",
            value === "0" ? "btn-fill" : " btn-fill-disabled"
          )}
          onClick={
            () => setValue(name, "0")
            // onChange && onChange("0")
          }
          aria-hidden="true"
        >
          {choice1}
        </div>
        <div
          className={cls(
            "btn-right btn-extra btn-full",
            value === "1" ? "btn-fill" : " btn-fill-disabled"
          )}
          onClick={() => setValue(name, "1")}
          aria-hidden="true"
        >
          {choice2}
        </div>
      </div>
    </div>
  );
}

export default LabelSelectBtn;
