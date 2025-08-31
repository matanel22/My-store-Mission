import React from "react";

interface ButtonUIProps {
  background?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const ButtonUI = ({
  background,
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
        background: disabled ? "#ccc" : background || "#007bff",
        color: disabled ? "#666" : "#fff",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default ButtonUI;
