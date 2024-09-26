import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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

    const words = transcript.split(/\s+/);

    for (const word of words) {
      if(word.localeCompare('good', undefined, { sensitivity: 'base' })==0) {
        props.newMove('cheering');
      }

      if(word.localeCompare('bad', undefined, { sensitivity: 'base' })==0) {
        props.newMove('disbelief');
      }
    }
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={dictoryCheck}>Change Move</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;