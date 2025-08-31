import ButtonUI from "./ButtonUI";



const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
        <ButtonUI onClick={onClose} >Close</ButtonUI>
        {children}
      </div>
    </div>
  );
};

export default Modal;
