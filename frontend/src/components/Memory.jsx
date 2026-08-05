import "./Memory.css";
import { useState } from "react";


function Memory({ memory, setMemory }) {


  const [text,setText] = useState("");



  const addMemory=()=>{


    if(!text.trim()) return;



    const updated=[

      ...memory,

      text

    ];



    setMemory(updated);


    localStorage.setItem(

      "mak_ai_memory",

      JSON.stringify(updated)

    );



    setText("");

  };







  const clearMemory=()=>{


    setMemory([]);


    localStorage.removeItem(
      "mak_ai_memory"
    );


  };






  return(


    <div className="memory-box">


      <h2>
        🧠 AI Memory
      </h2>



      <input

      placeholder="Add something AI should remember..."

      value={text}

      onChange={
        e=>setText(e.target.value)
      }

      />



      <button onClick={addMemory}>

        Save Memory

      </button>





      <div className="memory-list">


      {

        memory.map((item,index)=>(


          <p key={index}>

            • {item}

          </p>


        ))

      }


      </div>





      <button

      className="clear"

      onClick={clearMemory}

      >

        Clear Memory

      </button>



    </div>


  );


}


export default Memory;
