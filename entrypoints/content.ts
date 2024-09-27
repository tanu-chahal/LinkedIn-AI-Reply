import ReactDOM from "react-dom/client";
import AIIcon from "../src/AIIcon";
import React from "react";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("Hello from LinkedIn AI Reply.");
    document.addEventListener("focusin", (e: FocusEvent) => {
      const messageInput = document.querySelector<HTMLInputElement>(
        ".msg-form__contenteditable"
      );
      console.log("Message Input on focus", messageInput);
      if (messageInput && e.target === messageInput) {
        showAIIcon(messageInput);
      }
    });
  },
});

const showAIIcon = (messageInput: HTMLInputElement) => {
  if (document.getElementById("ai-reply-icon-container")) return;

  const iconContainer = document.createElement("div");
  iconContainer.id = "ai-icon-container";
  iconContainer.style.position = "absolute";
  iconContainer.style.right = "20px";
  iconContainer.style.bottom = "20px";

  messageInput.appendChild(iconContainer);

  const root = ReactDOM.createRoot(iconContainer);
  root.render(React.createElement(AIIcon as React.FC));
};
