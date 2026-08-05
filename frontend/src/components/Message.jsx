import "./Message.css";

function Message({ sender, text }) {
  return (
    <div
      className={
        sender === "user"
          ? "message user"
          : "message ai"
      }
    >
      <div className="avatar">
        {sender === "user" ? "👤" : "🤖"}
      </div>

      <div className="bubble">
        {text}
      </div>
    </div>
  );
}

export default Message;