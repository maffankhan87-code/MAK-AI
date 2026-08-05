import { useState } from "react";
import "./App.css";

type Message = {
  sender: "user" | "ai";
  text: string;
};

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText }
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/chat?message=${encodeURIComponent(userText)}`
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "No response"
        }
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Backend connection failed"
        }
      ]);
    }

    setLoading(false);
  }


  return (
    <div className="app">

      <div className="top">
        <h1>MAK AI</h1>
        <p>Your Intelligent AI Assistant</p>
      </div>


      <div className="chat">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "ai-message"
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="ai-message">
            Thinking...
          </div>
        )}

      </div>


      <div className="bottom">

        <input
          value={input}
          placeholder="Ask MAK AI..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default App;