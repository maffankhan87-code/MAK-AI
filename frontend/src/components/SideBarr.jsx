import "./Sidebar.css";

function Sidebar({
  chats,
  newChat,
  openChat,
  deleteChat,
  currentChat
}) {


  return (

    <div className="sidebar">


      <div className="logo">

        <h1>MAK AI</h1>

        <p>
          Powered by Groq
        </p>

      </div>




      <button
      className="new-chat"
      onClick={newChat}
      >

        + New Chat

      </button>






      <div className="history-title">

        Chat History

      </div>




      <div className="chat-list">


      {
        chats.map((chat,index)=>(


          <div

          key={chat.id}

          className={
            currentChat===index
            ?
            "chat-item active"
            :
            "chat-item"
          }


          >



            <span

            onClick={()=>openChat(index)}

            >

              💬 {chat.name}

            </span>





            <button

            className="delete"

            onClick={()=>
              deleteChat(index)
            }

            >

              🗑

            </button>



          </div>



        ))
      }



      </div>







      <div className="menu">


        <div className="menu-item">

          ⚡ Fast Responses

        </div>



        <div className="menu-item">

          🤖 Llama 3.3

        </div>



        <div className="menu-item">

          🔒 Secure AI

        </div>



      </div>







      <div className="footer">

        MAK AI v2.0

      </div>



    </div>


  );

}


export default Sidebar;