const TextInput = ({ value, onChange }: { value: string; onChange: (value: string) => void; }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
};

export default TextInput;
