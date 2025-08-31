
const ButtonUI = ({ onClick, children }: { onClick: () => void; children: React.ReactNode; }) => {
  return (
    <button onClick={onClick} style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#007bff', color: '#fff' }}>
      {children}
    </button>
  );
};

export default ButtonUI;
