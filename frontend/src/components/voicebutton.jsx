import "./VoiceButton.css";
import { useState } from "react";

function VoiceButton({ onResult }) {

  const [active, setActive] = useState(false);


  const startVoice = () => {


    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert("Voice is not supported in this browser");

      return;

    }



    const recognition = new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;



    recognition.onstart = () => {

      setActive(true);

    };



    recognition.onresult = (event) => {


      const voiceText =
      event.results[0][0].transcript;



      if(voiceText){

        onResult(voiceText);

      }


    };




    recognition.onerror = () => {

      setActive(false);

    };




    recognition.onend = () => {

      setActive(false);

    };



    recognition.start();


  };




  return (

    <button

    type="button"

    className={
      active
      ?
      "voice active"
      :
      "voice"
    }

    onClick={startVoice}

    >

      🎤

    </button>

  );

}


export default VoiceButton;