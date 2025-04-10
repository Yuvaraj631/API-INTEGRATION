import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import './styles.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/messages').then((res) => {
      setMessages(res.data);
    });

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('chat message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (username && content) {
      socket.emit('chat message', { username, content });
      setContent('');
    }
  };

  return (
    <div className="chat-box">
      <h2>Real-Time Chat</h2>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}><strong>{m.username}:</strong> {m.content}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Type a message" />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
