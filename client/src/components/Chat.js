import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your backend URL

const Chat = ({ userId, chatPartnerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch chat history
    axios.get(`http://localhost:5000/messages/${userId}/${chatPartnerId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, [userId, chatPartnerId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
  
    const messageData = { sender: userId, receiver: chatPartnerId, message: newMessage };
  
    // Send message via API
    await axios.post("http://localhost:5000/api/chat", messageData);
  
    // Emit via Socket.io for real-time update
    socket.emit("sendMessage", messageData);
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.sender === userId ? "blue" : "green" }}>
            {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
