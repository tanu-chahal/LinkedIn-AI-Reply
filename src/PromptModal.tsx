import React, { useRef, useEffect } from "react";
import "./index.css";
import GenerateIcon from "@/assets/GenerateIcon.svg"

interface PromptModalProps {
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
      <div
        className="promptModal bg-white p-4 rounded-lg shadow-lg w-2/5 z-[999] flex flex-col items-end"
        ref={modalRef}
      >
        <input className="border border-gray-100 p-2 mb-4 w-full focus:outline-gray-400" placeholder="Enter command" />
        <button
          className="bg-primary text-white px-4 py-3 flex items-center justify-center gap-2 text-sm rounded-md self-end cursor-pointer"
          onClick={() => console.log("Generating AI Response")}
        >
          <img className="h-5" src={GenerateIcon} alt="Generate" /><span>Generate</span>
        </button>
      </div>
    </div>
  );
};

export default PromptModal;
