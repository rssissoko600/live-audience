import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SceneRendererComponent from './SceneRendererComponent';

const Dictaphone = () => {
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'right',
      callback: (condition) => setMessage(`The box is now spinning Right`)
    },
    {
      command: 'left',
      callback: (condition) => setMessage(`The box is now spinning Left`)
    },
    {
      command: 'up',
      callback: (condition) => setMessage(`The box is now spinning Up`)
    },
    {
        command: 'down',
        callback: (condition) => setMessage(`The box is now spinning Down`)
    }
  ]
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
        <SceneRendererComponent/>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>{transcript}</p>
      <p>{message}</p>
    </div>
  );
};
export default Dictaphone;