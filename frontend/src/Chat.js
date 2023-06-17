import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");

  const sendText = () => {
    socket && socket.emit("sendMessage", text);
    setText("");
  };

  useEffect(() => {
    const socketServer = io("http://localhost:9000");
    setSocket(socketServer);
    setMessages(messages);
    // Return matlab run this on component unmount. In this case user closes the tab
    return () => {
      socketServer.disconnect();
    };
  }, []);

  // useEffect for receiveing changes
  useEffect(() => {
    console.log("Recieve useEffect called");
    if (socket === null) return;

    const handleChange = (delta) => {
      console.log(delta);
      setMessages((messages) => [...messages, delta]);
    };

    socket && socket.on("receiveMessage", handleChange);
  }, [socket]);
  return (
    <>
      {messages.length !== 0 &&
        messages.map((message, id) => {
          return <p key={id}>{message}</p>;
        })}
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" onClick={sendText}>
          Send
        </button>
      </div>
    </>
  );
}
