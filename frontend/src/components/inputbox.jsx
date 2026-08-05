import { useState } from "react";
import "./InputBox.css";

function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="input-container">

      <input
        type="text"
        placeholder="Message MAK AI..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
      />

      <button onClick={send}>
        Send
      </button>

    </div>
  );
}

export default InputBox;