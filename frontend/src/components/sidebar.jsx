import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <h1>MAK AI</h1>
        <p>Powered by Groq</p>
      </div>

      <button className="new-chat">
        + New Chat
      </button>

      <div className="menu">

        <div className="menu-item">
          💬 AI Chat
        </div>

        <div className="menu-item">
          ⚡ Fast Responses
        </div>

        <div className="menu-item">
          🤖 Llama 3.3
        </div>

      </div>

      <div className="footer">
        MAK AI v1.0
      </div>

    </div>
  );
}

export default Sidebar;