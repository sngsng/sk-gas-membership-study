import React from "react";
import { UseFormSetValue } from "react-hook-form";
import cls from "../../util";

interface LabelSelectBtnProps {
  label: string;
  name: string;
  value: string;
  setValue: UseFormSetValue<any>;
  options: {
    label: string;
    value: string;
  }[];
  // onChange?: (...event: any[]) => void;
}

function LabelSelectBtn({
  label,
  name,
  value,
  options,
  setValue,
}: LabelSelectBtnProps) {
  // map으로 돌려서 data 받은 다음~
  return (
    <div className="flex flex-col mb-20 font-bold text-b3 ">
      {label}
      <div className="flex w-full mt-8">
        {options.map((option, index) => {
          return (
            <div
              className={cls(
                " btn-extra btn-full",
                index === 0 ? "btn-left" : "btn-right",
                value === option.value ? "btn-fill" : " btn-fill-disabled"
              )}
              onClick={() => setValue(name, option.value)}
              aria-hidden="true"
              key={option.label}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LabelSelectBtn;
