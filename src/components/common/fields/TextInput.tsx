interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput = ({ value, onChange, placeholder }: TextInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
      }}
    />
  );
};

export default TextInput;
