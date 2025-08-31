


const NumberInput = ({ value, onChange }: { value: number; onChange: (value: number) => void; }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
};

export default NumberInput;
