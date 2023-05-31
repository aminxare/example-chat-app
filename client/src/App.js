import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [to, setTo] = useState("");
  const [socket, setSocket] = useState(null);
  const [id, setId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("ws://localhost:5001", {
      auth: {
        was: "saw"
      }
    });
    setSocket(socket);

    socket.on("connection", (id) => setId(id));
    socket.on("message", (message) => {
      setMessages(prev=> [message, ...prev]);
    });
  }, []);

  return (
    <div className="App">
        {id && <p>your id is: {id}</p>}
        <input
          type="text"
          placeholder="message"
          onChange={(e) => setMsg(e.target.value)}
        />
        <input
          type="text"
          placeholder="to"
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="button"
          onClick={() => {
            socket.emit("message", {to, payload: msg});
          }}
          value="click"
        >
        </input>
        <p>messages: </p>
        <ul>
          {messages.map(m=> <li>from: {m.from}, text: {m.payload}</li>)}
        </ul>
    </div>
  );
}

export default App;
