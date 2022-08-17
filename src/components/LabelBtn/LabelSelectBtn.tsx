import React from "react";
import { UseFormSetValue } from "react-hook-form";
import cls from "../../util";

interface LabelSelectBtnProps {
  label?: string;
  name: string;
  value: string;
  setValue?: UseFormSetValue<any>;
  onChange?: any;
  options: {
    label: string;
    value: string;
  }[];
}

function LabelSelectBtn({
  label,
  name,
  value,
  options,
  setValue,
  onChange,
}: LabelSelectBtnProps) {
  return (
    <div className="flex flex-col mb-20 font-bold text-b3 ">
      {label && label}
      <div className="flex w-full mt-8">
        {options.map((option, index) => {
          return (
            <div
              className={cls(
                "btn-extra btn-full center",
                index === 0 ? "btn-left" : "btn-right",
                value === option.value ? "btn-fill" : " btn-fill-disabled "
              )}
              onClick={
                setValue
                  ? () => setValue(name, option.value)
                  : () => onChange(option.value)
              }
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
