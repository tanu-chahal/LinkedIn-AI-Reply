import React from "react";
import AiIcon from "@/assets/AIIcon.svg";
import "./index.css";

const AIIcon: React.FC = () => {
  return (
    <div className="cursor-pointer w-12 h-12 rounded-full bg-white flex justify-center items-center">
      <img
        src={AiIcon}
        alt="AI"
        onClick={() => console.log("AI Logo Clicked")}
      />
    </div>
  );
};
export default AIIcon;
