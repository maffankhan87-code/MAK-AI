import "./InputBox.css";
import { useState } from "react";
import VoiceButton from "./VoiceButton";
import FileUpload from "./FileUpload";


function InputBox({ onSend }) {


  const [text,setText] = useState("");



  const send = () => {


    if(!text.trim()) return;


    onSend(text);


    setText("");

  };




  const handleVoice = (voice) => {


    if(!voice.trim()) return;


    setText(voice);



    setTimeout(()=>{


      onSend(voice);


      setText("");



    },500);


  };







  const uploadFile = async(file)=>{


    console.log("Uploaded:",file.name);



    const formData = new FormData();


    formData.append(
      "file",
      file
    );



    try{


      const response = await fetch(

        "http://192.168.18.111:8000/upload",

        {

          method:"POST",

          body:formData

        }

      );



      const data = await response.json();



      if(data.reply){


        onSend(

          "📎 "+file.name+
          "\n\n"+
          data.reply

        );


      }



    }

    catch(error){


      onSend(
        "❌ File upload failed"
      );


    }


  };







  return (

    <div className="input-area">


      <FileUpload

      onFile={uploadFile}

      />



      <VoiceButton

      onResult={handleVoice}

      />




      <textarea

      value={text}

      placeholder="Message MAK AI..."

      onChange={
        e=>setText(e.target.value)
      }



      onKeyDown={

        e=>{


          if(
            e.key==="Enter"
            &&
            !e.shiftKey
          ){

            e.preventDefault();

            send();

          }


        }

      }


      />





      <button

      type="button"

      onClick={send}

      >

      ➤

      </button>



    </div>

  );


}


export default InputBox;