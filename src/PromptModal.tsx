import React, { useRef, useEffect } from "react";
import "./index.css";
import GenerateIcon from "@/assets/GenerateIcon.svg";
import RegenerateIcon from "@/assets/RegenerateIcon.svg";
import InsertIcon from "@/assets/InsertIcon.svg";

interface PromptModalProps {
  insertResponse: (response: string) => void;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ onClose, insertResponse }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<{ user: string; ai?: string }[]>([]);
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

  const handleResponseGeneration = () => {
    if (prompt) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          user: prompt,
          ai: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
        },
      ]);
      setPrompt("");
    }
  };

  const handleResponseInsertion = () => {
    const lastBotResponse = messages
    .filter((msg) => msg.ai)
    .slice(-1)[0]?.ai;
    
    insertResponse(lastBotResponse || "");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999] w-full">
      <div
        className="promptModal bg-[#F9FAFB] p-4 rounded-lg shadow-lg w-[450px] z-[999] flex flex-col items-end"
        ref={modalRef}
      >
        <div className="msgs mb-4 w-full max-h-fit overflow-auto border-b border-gray-200 cursor-default" contentEditable={false}>
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <div className="text-right">
                <p className="bg-prompt-bg text-primary-gray p-2 rounded-md max-w-sm inline-block text-left">
                  {message.user}
                </p>
              </div>
              {message.ai && (
                <div className="text-left mt-2">
                  <p className="bg-response-bg text-primary-gray p-2 rounded-md max-w-sm inline-block">
                    {message.ai}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <input
          className="border border-gray-100 p-2 mb-4 w-full focus:outline-primary-gray focus:border-none text-input-text-clr"
          placeholder="Your prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {messages.length === 0 ? (
          <button
            className="bg-primary text-white px-4 py-3 flex items-center justify-center gap-2 text-sm rounded-md self-end cursor-pointer"
            onClick={handleResponseGeneration}
            contentEditable={false}
          >
            <img className="h-5" src={GenerateIcon} alt="Generate" />
            <span>Generate</span>
          </button>
        ) : (
          <div className="buttons flex gap-5">
            <button
              className="bg-transparent text-primary-gray px-4 py-3 flex items-center justify-center gap-2 text-sm rounded-md self-end cursor-pointer border border-solid border-gray-500"
              onClick={handleResponseInsertion}
              contentEditable={false}
            >
              <img className="h-5" src={InsertIcon} alt="Insert" />
              <span className="font-semibold">Insert</span>
            </button>
            <button
              className="bg-primary text-white px-4 py-3 flex items-center justify-center gap-2 text-sm rounded-md self-end cursor-pointer"
              onClick={()=>console.log("Regenerating AI Response")}
              disabled
              contentEditable={false}
            >
              <img className="h-5" src={RegenerateIcon} alt="Regenerate" />
              <span>Regenerate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptModal;
