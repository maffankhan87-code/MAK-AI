import "./App.css";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";


function App() {

const PASSWORD = "mak1998";


const [unlocked,setUnlocked] = useState(false);
const [password,setPassword] = useState("");
const [loginError,setLoginError] = useState("");

const [messages,setMessages] = useState([]);

const [chats,setChats] = useState([]);

const [currentChat,setCurrentChat] = useState(0);

const [typing,setTyping] = useState(false);



useEffect(()=>{

const saved = localStorage.getItem(
"mak_ai_chats"
);


if(saved){

setChats(JSON.parse(saved));

}

else{

setChats([
{
id:Date.now(),
name:"New Chat",
messages:[]
}
]);

}

},[]);



useEffect(()=>{

localStorage.setItem(
"mak_ai_chats",
JSON.stringify(chats)
);

},[chats]);





const unlockAI=()=>{


if(password===PASSWORD){

setUnlocked(true);
setLoginError("");

}

else{

setLoginError("Wrong Password");
setPassword("");

}

};





const newChat=()=>{


const newOne={

id:Date.now(),

name:"New Chat",

messages:[]

};


setChats(prev=>[

...prev,

newOne

]);


setCurrentChat(chats.length);

setMessages([]);


};





const sendMessage=async(text)=>{


if(!text.trim()) return;



const userMsg={

sender:"user",

text:text

};



const updated=[

...messages,

userMsg

];



setMessages(updated);



setTyping(true);



try{


const response = await fetch(

`http://192.168.18.111:8000/chat?message=${encodeURIComponent(text)}`

);



const data = await response.json();


const reply =
data.reply ||
data.error ||
"No response";



const aiMsg={

sender:"ai",

text:reply

};




window.speechSynthesis.cancel();


const speech =
new SpeechSynthesisUtterance(reply);


speech.lang="en-US";


window.speechSynthesis.speak(
speech
);



const finalMessages=[

...updated,

aiMsg

];


setMessages(finalMessages);




setChats(prev=>{

let copy=[...prev];


if(copy[currentChat]){

copy[currentChat].messages =
finalMessages;

}


return copy;

});


}

catch(error){


setMessages(prev=>[

...prev,

{

sender:"ai",

text:"Cannot connect to backend."

}

]);


}



setTyping(false);


};const openChat=(index)=>{

setCurrentChat(index);


setMessages(
chats[index]?.messages || []
);

};





const deleteChat=(index)=>{


let copy=[...chats];


copy.splice(index,1);



if(copy.length===0){

copy.push({

id:Date.now(),

name:"New Chat",

messages:[]

});

}



setChats(copy);


setCurrentChat(0);


setMessages(
copy[0].messages
);


};





if(!unlocked){

return(

<div className="login-screen">


<div className="login-box">


<h1>
🤖 MAK AI
</h1>


<p>
Enter Password
</p>



<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}


onKeyDown={
e=>{

if(e.key==="Enter"){

unlockAI();

}

}

}


/>



<button onClick={unlockAI}>

Unlock

</button>




{

loginError &&

<span className="error">

{loginError}

</span>

}



</div>


</div>


);

}




return(

<div className="app">



<Sidebar

chats={chats}

newChat={newChat}

openChat={openChat}

deleteChat={deleteChat}

currentChat={currentChat}

/>




<div className="main">



<ChatWindow

messages={messages}

typing={typing}

/>



<InputBox

onSend={sendMessage}

/>



</div>



</div>


);



}



export default App;