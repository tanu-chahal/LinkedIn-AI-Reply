import ReactDOM, { createRoot } from "react-dom/client";
import AIIcon from "../src/AIIcon";
import App from "../src/App";
import React from "react";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    document.addEventListener("focusin", (e: FocusEvent) => {
      const messageInput = document.querySelector<HTMLInputElement>(
        ".msg-form__contenteditable"
      );
      if (messageInput && e.target === messageInput) {
        showAIIcon(messageInput);
      }
    });

    document.addEventListener("focusout", (e: FocusEvent) => {
      const messageInput = document.querySelector<HTMLInputElement>(
        ".msg-form__contenteditable"
      );

      const relatedTarget = e.relatedTarget as HTMLElement;
      if (
        messageInput &&
        e.target === messageInput &&
        !document
          .getElementById("ai-reply-icon-container")
          ?.contains(relatedTarget)
      ) {
        const iconContainer = document.getElementById(
          "ai-reply-icon-container"
        );

        // removing the AI Icon on focus out
        if (iconContainer) {
          const root = createRoot(iconContainer);
          root.unmount();
          iconContainer.remove();
        }
      }
    });
  },
});

const showAIIcon = (messageInput: HTMLInputElement) => {
  if (document.getElementById("ai-reply-icon-container")) return;

  const iconContainer = document.createElement("div");
  iconContainer.id = "ai-reply-icon-container";
  iconContainer.style.position = "absolute";
  iconContainer.style.right = "12px";
  iconContainer.style.bottom = "12px";

  messageInput.appendChild(iconContainer);

  const root = ReactDOM.createRoot(iconContainer);

  const renderAIIcon = () => {
    root.render(
      React.createElement(AIIcon, {
        onClick: () => {
          render(true);
        },
      })
    );
  };

  const render = (isModalVisible: boolean) => {
    if (isModalVisible) {
      root.render(React.createElement(App, { render, insertResponse }));
    } else {
      renderAIIcon();
    }
  };

  const insertResponse = (response: string) => {
    const messageInput = document.querySelector<HTMLInputElement>(
      ".msg-form__contenteditable"
    );

    if (messageInput) {
      messageInput.innerHTML = `<p>${response}</p>`;
      // moving the cursor next to inserted response
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(messageInput);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      messageInput.focus();
    }
  };

  render(false);
};
