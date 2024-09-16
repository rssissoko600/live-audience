import logo from './logo.svg';
import './App.css';
import SceneRendererComponent from './SceneRendererComponent';
import Dictaphone from './SpeechRecognitionComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Speech Recognition Test
        </p>
        <Dictaphone />
      </header>
    </div>
  );
}

export default App;