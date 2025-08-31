const TextArea = ({ value, onChange }: { value: string; onChange: (value: string) => void; }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', minHeight: '100px' }}
    />
  );
};

export default TextArea;
