import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface DateFieldProps {
  name: string;
  label?: string;
  validate?: any;
}

const DateField = ({ name, label, validate }: DateFieldProps) => {
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
        defaultValue={new Date()}
        render={({ field }) => {
          // Convert Date object to yyyy-MM-dd string for input value
          const valueAsString = field.value instanceof Date
            ? field.value.toISOString().split('T')[0]
            : field.value;
          return (
            <input
              type="date"
              value={valueAsString}
              onChange={e => {
                const dateValue = e.target.value ? new Date(e.target.value) : null;
                field.onChange(dateValue);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={e => {
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
                backgroundColor: "#ffffff",
                color: "#1f2937",
                boxSizing: "border-box",
              }}
            />
          );
        }}
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

export default DateField;
