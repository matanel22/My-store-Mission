const DateInput = ({ value, onChange }: { value: Date; onChange: (value: Date) => void; }) => {
  return (
    <input
      type="date"
      value={value.toISOString().split('T')[0]}
      onChange={(e) => onChange(new Date(e.target.value))}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
};

export default DateInput;
