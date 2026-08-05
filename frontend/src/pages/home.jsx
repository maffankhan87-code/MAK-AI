function Home() {
  return (
    <div className="home">
      <h1>MAK AI</h1>
      <p>Your Intelligent AI Assistant</p>

      <div className="chat-box">
        <input
          type="text"
          placeholder="Ask MAK AI anything..."
        />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Home;