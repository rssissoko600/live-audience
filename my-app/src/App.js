import logo from './logo.svg';
import './App.css';
import SceneRendererComponent from './SceneRendererComponent';
import Dictaphone from './SpeechRecognitionComponent';
import React, { Component } from 'react';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { rpm: 10 };
  }

  newRPM = (newRPM) => {
    this.setState({rpm: newRPM});
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Speech Recognition Test</p>
          <p>RPM: {this.state.rpm}</p>
          
          <Dictaphone newRPM={this.newRPM}/>

          <SceneRendererComponent data={this.state.rpm}/>

        </header>
      </div>
    );
  }
}

export default App;