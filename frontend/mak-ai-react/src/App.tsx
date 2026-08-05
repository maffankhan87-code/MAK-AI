import "./App.css";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Welcome to MAK AI.\nHow can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.18.111:8000";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userInput,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/chat?message=${encodeURIComponent(userInput)}`
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Cannot connect to backend.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>🤖 MAK AI</h2>

        <button>+ New Chat</button>
        <button>History</button>
        <button>Settings</button>

        <div className="bottom">
          Version 1.0
        </div>
      </aside>

      <main className="main">

        <header className="header">
          <h1>MAK AI</h1>
          <p>Your Personal AI Assistant</p>
        </header>

        <section className="chat">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "message user" : "message ai"}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message ai">
              ⏳ MAK AI is thinking...
            </div>
          )}

        </section>

        <div className="inputArea">

          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
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

      </main>

    </div>
  );
}

export default App;