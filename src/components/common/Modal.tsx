
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(40, 50, 70, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 8px 32px rgba(30,41,59,0.18)',
          minWidth: '340px',
          maxWidth: '95vw',
          width: '32%',
          maxHeight: '90vh',
          position: 'relative',
          border: '1px solid #e2e8f0',
          padding: '40px 32px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            backgroundColor: '#64748b',
            color: '#fff',
            borderRadius: '50%',
            border: 'none',
            width: '36px',
            height: '36px',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 2px 8px rgba(30,41,59,0.08)',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#334155'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#64748b'; }}
          aria-label="Close modal"
        >
          &#10005;
        </button>
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
