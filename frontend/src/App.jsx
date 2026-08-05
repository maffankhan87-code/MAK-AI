import "./App.css";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

function App() {

  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {

    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/chat?message=${encodeURIComponent(text)}`
      );

      const data = await response.json();

      const aiMessage = {
        sender: "ai",
        text: data.reply || data.error,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Cannot connect to backend.",
        },
      ]);

    }

  };

  return (

    <div className="app">

      <Sidebar />

      <div className="main">

        <ChatWindow messages={messages} />

        <InputBox onSend={sendMessage} />

      </div>

    </div>

  );

}

export default App;