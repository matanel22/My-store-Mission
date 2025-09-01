import { SelectInputProps } from "../../../types/fieldsType";

const SelectInput = ({ options, value, onChange }: SelectInputProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default SelectInput;
