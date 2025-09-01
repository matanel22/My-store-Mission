import React from "react";

interface CardProps {
  children: React.ReactNode;
  onClick: () => void;
  onDelete: () => void;
}

const Card = ({ children, onClick, onDelete }: CardProps) => {
  return (
    <div style={{ margin: "16px" }}>
      <div
        onClick={onClick}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "8px",
          cursor: "pointer",
          paddingTop: "40px",
          position: "relative",
        }}
      >
        {children}
        <button
          onClick={(e) => {
            e.stopPropagation();
             
              onDelete();
            
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c82333";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#dc3545";
          }}
        >
          ✕ Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
