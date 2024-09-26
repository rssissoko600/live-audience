import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SceneRendererComponent from './SceneRendererComponent';
import Dictaphone from './SpeechRecognitionComponent';
import React from 'react';
import LandingPage from './LandingPageComponent';

class SpeechRecognitionTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pose: "sitting", scene: undefined };
  }

  // Use setState correctly to ensure React lifecycle works as expected
  newMove = (newMove) => {
    this.setState({ pose: newMove });
  }

  newScene = (newScene) => {
    this.setState({ scene: newScene });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Speech Recognition Test</p>
          
          {/* Dictaphone updates the pose via newMove */}
          <Dictaphone newMove={this.newMove} />

          {/* SceneRendererComponent should react to updated pose */}
          <SceneRendererComponent 
            data={this.state.pose} 
            scene={this.state.scene} 
            newMove={this.newMove} 
            newScene={this.newScene} 
          />
        </header>
      </div>
    );
  }
}

const App = () => (
  <Router>
    <Routes>
      {/* Define the route for the landing page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Define the route for the speech recognition test */}
      <Route path="/test" element={<SpeechRecognitionTest />} />
    </Routes>
  </Router>
);

export default App;
