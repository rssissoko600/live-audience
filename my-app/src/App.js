import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SceneRendererComponent from './SceneRendererComponent';
import Dictaphone from './SpeechRecognitionComponent';
import React, { Component } from 'react';


// Landing Page Component
const LandingPage = () => (
  <div className="landing-page">
    <h1>Welcome to the App</h1>
    <p>Click the button below to start the Speech Recognition Test!</p>
    <Link to="/test">
      <button className="start-btn">Go to Test</button>
    </Link>
  </div>
);

class SpeechRecognitionTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pose: "sitting", scene: undefined};
  }

  newMove = (newMove, props) => {
    this.state = { pose: newMove};
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
          
          <Dictaphone newMove={this.newMove}/>

          <SceneRendererComponent data={this.state.pose} scene={this.state.scene} newMove={this.newMove} newScene={this.newScene}/>

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