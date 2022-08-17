import React from "react";
import Select from "react-select";
import cls from "../../util";

interface SelectFormProps {
  HtmlFor: string;
  label: string;
  className?: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  errors?: string;
  defaultValue: {
    value: string;
    label: string;
  };

  onChange: (...event: any[]) => void;
}

function SelectForm({
  HtmlFor,
  label,
  className = "",
  placeholder,
  onChange,
  options,
  errors,
  defaultValue,
}: SelectFormProps) {
  const styles = {
    input: (prev: any) => ({
      ...prev,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      color: "#808080",
    }),
    control: (prev: any) => ({
      ...prev,
      minHeight: 60,
      borderRadius: 8,
      paddingLeft: 8,
      paddingRight: 8,
      borderColor: "rgb(204, 204, 204)",
    }),
    // 구분선
    indicatorSeparator: (prev: any) => ({
      ...prev,
      backgroundColor: "white",
    }),
    placeholder: (prev: any) => ({
      ...prev,
      color: "#808080",
    }),
  };

  return (
    <label htmlFor={HtmlFor} className="block mb-20 text-b3 ">
      <p className="mb-8 font-bold">{label}</p>
      <Select
        id={HtmlFor}
        onChange={onChange}
        options={options}
        styles={styles}
        isSearchable={false}
        placeholder={placeholder}
        className={cls("font-normal text-b1 text-black", className)}
        defaultValue={defaultValue.label === "" ? placeholder : defaultValue}
      />
      {errors && <p className="mt-8 font-normal error">{errors}</p>}
    </label>
  );
}

export default SelectForm;
