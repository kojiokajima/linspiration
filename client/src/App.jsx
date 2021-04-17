import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Router from './Router'
import './App.css';
import './assets/styles/main.scss'
import {Button} from "react-materialize"

function App() {

  const resetLocal = () => {
    localStorage.clear()
  }
  return (
    <div className="App">
    {/* <div> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <br/>
      <Button waves="light" onClick={resetLocal}>reset local</Button>

    </div>
  );
}

export default App;
