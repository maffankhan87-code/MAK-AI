import "./ChatWindow.css";
import Message from "./Message";
import { useEffect, useRef } from "react";


function ChatWindow({ messages, typing }) {


  const bottomRef = useRef(null);



  useEffect(()=>{

    bottomRef.current?.scrollIntoView({
      behavior:"smooth"
    });

  },[messages,typing]);




  return (

    <div className="chat-window">


      {
        messages.length === 0 && (

          <div className="welcome">


            <h1>
              👋 Welcome to MAK AI
            </h1>


            <p>
              Ask me anything...
            </p>


          </div>

        )
      }






      {
        messages.map((msg,index)=>(

          <Message

          key={index}

          sender={msg.sender}

          text={msg.text}

          />

        ))
      }






      {
        typing && (

          <div className="typing">

            MAK AI is typing...

            <span>.</span>
            <span>.</span>
            <span>.</span>

          </div>

        )
      }





      <div ref={bottomRef}></div>


    </div>

  );

}


export default ChatWindow;