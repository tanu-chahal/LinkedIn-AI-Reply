import React from "react";
import AIIcon from "./AIIcon";
import PromptModal from "./PromptModal";

interface AppProps {
  insertResponse: (res: string) => void;
  render: (mV: boolean) => void;
}

const App: React.FC<AppProps> = ({ render, insertResponse }) => {
  return (
    <>
      <AIIcon
        onClick={() => {
          render(false);
        }}
      />
      <PromptModal
        onClose={() => {
          render(false);
        }}
        insertResponse={insertResponse}
      />
    </>
  );
};

export default App;
