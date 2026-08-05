import "./Message.css";


function Message({sender,text}){


return(

<div

className={
sender==="user"
?
"message user"
:
"message ai"
}

>


<div className="bubble">


<p>{text}</p>


<button

className="copy"

onClick={()=>{

navigator.clipboard.writeText(text);

}}

>

📋

</button>



</div>


</div>


);


}


export default Message;