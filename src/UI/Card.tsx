import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Card = ({ children, onClick }: CardProps) => {
  return (
    <div style={{ margin: '16px', cursor: 'pointer' }}>
      <div onClick={onClick} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '8px' }}>
        {children}
      </div>
    </div>
  );
};

export default Card;