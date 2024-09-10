import logo from './logo.svg';
import './App.css';
import PageComponent from './PageComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This project was created using the create-react-app kickstart   
          <a
          className="App-link"
          href="https://create-react-app.dev/docs/getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          found here.
        </a>
        </p>

        <p>
          Further, Babylon.js was loaded in a component below using the guide 
          <a
          className="App-link"
          href="https://doc.babylonjs.com/communityExtensions/Babylon.js+ExternalLibraries/BabylonJS_and_ReactJS"
          target="_blank"
          rel="noopener noreferrer"
        >
          found here.
        </a>
        </p>
        <PageComponent />
      </header>
    </div>
  );
}

export default App;