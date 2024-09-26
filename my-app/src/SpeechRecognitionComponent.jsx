import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechRecognition.css'; 

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const dictoryCheck = () => {

    // if(/\bgood\b/i.test(transcript)) {
    //   props.newMove('cheering');
    // }

    // if(/\bbad\b/i.test(transcript)) {
    //   props.newMove('disbelief');
    // }

    const wordActions = new Map([
      ['good', 'cheering'],
      ['bad', 'disbelief'],
      ['calm', 'sitting'],
      ['no', 'dissaproval'],
      ['slow', 'clapping2'], // crashed the app??
      ['applause', 'clapping1']
      // Add more word-action pairs here
    ]);

    const words = transcript.split(/\s+/);

    const actionKey = Array.from(wordActions.keys()).find(key =>
      words.some(word => word.localeCompare(key, undefined, { sensitivity: 'base' }) === 0)
    );
  
    if (actionKey) {
      props.newMove(wordActions.get(actionKey));
    }
  }

  return (
    // <div>
    //   <p>Microphone: {listening ? 'on' : 'off'}</p>
    //   <button onClick={SpeechRecognition.startListening}>Start</button>
    //   <button onClick={SpeechRecognition.stopListening}>Stop</button>
    //   <button onClick={dictoryCheck}>Change Move</button>
    //   <button onClick={resetTranscript}>Reset</button>
    //   <p>{transcript}</p>
    // </div>

    <div class="container">
    <div class="small-text"> 
      <p>Microphone: {listening ? 'ON' : 'OFF'}</p>
    </div>
    
    <div class="controls">
        <button onClick={SpeechRecognition.startListening} class="control-button" id="start"> Start</button>
        <div class="divider"/>
        <button onClick={SpeechRecognition.stopListening} class="control-button" id="stop">Stop</button>
        <div class="divider"/>
        <button onClick={dictoryCheck} class="control-button" id="change-move">Change Move</button>
        <div class="divider"/>
        <button onClick={resetTranscript} class="control-button" id="reset">Reset</button>
    </div>
    <div class="transcript" id="transcript">Transcript will appear here... <br></br> {transcript}</div>
    </div>
  );
};

export default Dictaphone;