import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = io("ws://localhost:5000");

    socket.emit("hello", 10, '10');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is test message!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
