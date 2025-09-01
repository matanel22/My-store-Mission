import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputHFProps } from "../../../types/fieldsType";



const InputHF = ({
  name,
  type = "text",
  placeholder,
  label,
  validate,
  disabled = false,
}: InputHFProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = errors[name];

  return (
    <div style={{ marginBottom: "24px" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            fontSize: "14px",
            color: "#374151",
          }}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={validate}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur();
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: `2px solid ${
                hasError ? "#ef4444" : isFocused ? "#3b82f6" : "#d1d5db"
              }`,
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.2s ease-in-out",
              backgroundColor: disabled ? "#f9fafb" : "#ffffff",
              color: disabled ? "#9ca3af" : "#1f2937",
              boxSizing: "border-box",
            }}
          />
        )}
      />
      {hasError && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "4px",
            marginBottom: "0",
          }}
        >
          {(hasError as any)?.message || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default InputHF;
