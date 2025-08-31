import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Card = ({ children, onClick }: CardProps) => {
  return (
    <div onClick={onClick} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      {children}
    </div>
  );
};

export default Card;