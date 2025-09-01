import React from "react";
import { ButtonUIProps } from "../../types/UIInterface/ButtonInterface";



const ButtonUI = ({
  backgroundColor,
  onClick,
  children,
  disabled = false,
  style,
  type,
}: ButtonUIProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: disabled ? "#ccc" : backgroundColor || "#007bff",
        color: disabled ? "#666" : "#fff",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default ButtonUI;
