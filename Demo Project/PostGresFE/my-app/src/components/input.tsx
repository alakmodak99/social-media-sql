import React from "react";

const Input = ({
  label,
  inputType,
  onChange,
  placeHolder,
  value,
  autoFocus,
}: {
  label: string;
  inputType: string;
  onChange: any;
  placeHolder?: string;
  value?: string;
  autoFocus?: boolean;
}) => {
  return (
    <div>
      <label style={{ fontSize: "20px", textAlign: "left" }} htmlFor="un">
        {label}
      </label>{" "}
      <br />
      <input
        style={{
          width: "250px",
          height: "30px",
          fontSize: "18px",
          paddingLeft: "10px",
          caretColor: "red",
          borderRadius: "10px",
          margin: "10px 0",
        }}
        autoFocus={autoFocus}
        type={inputType}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
