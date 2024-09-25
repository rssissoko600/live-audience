import logo from './logo.svg';
import './App.css';
import SceneRendererComponent from './SceneRendererComponent';
import Dictaphone from './SpeechRecognitionComponent';
import React, { Component } from 'react';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { pose: "sitting", scene: undefined};
  }

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
          
          <Dictaphone newMove={this.newMove}/>

          <SceneRendererComponent data={this.state.pose} scene={this.state.scene} newScene={this.newScene}/>

        </header>
      </div>
    );
  }
}

export default App;