import React, { useState } from "react";

interface InputHFProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const InputHF = ({
  name,
  value,
  onChange,
  onBlur,

  inputRef,

  type,
  placeholder,
}: InputHFProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onBlur={onBlur}
    >
      <input
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        type={type ? type : "text"}
        className=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
