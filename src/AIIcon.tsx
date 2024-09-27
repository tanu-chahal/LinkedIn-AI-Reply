import React from "react";
import AiIcon from "@/assets/AIIcon.svg";
import "./index.css";

interface AIIconProps {
  onClick: () => void; 
}

const AIIcon: React.FC<AIIconProps> = ({ onClick }) => {
  return (
    <div className="cursor-pointer w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md" onClick={onClick}>
      <img
        src={AiIcon}
        alt="AI"
      />
    </div>
  );
};
export default AIIcon;