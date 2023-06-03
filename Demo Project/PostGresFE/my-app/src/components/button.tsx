import React from "react";

const Button = ({ text, onClick }: { text: string, onClick?:()=> void }) => {
  return (
    <button
    onClick={onClick}
      style={{ padding: "8px 20px", fontSize: "22px", cursor: "pointer", borderRadius:"10px", color:"black", backgroundColor:"white" }}
    >
      {text}
    </button>
  );
};

export default Button;
