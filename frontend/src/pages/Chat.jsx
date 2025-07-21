import { useState, useEffect } from "react";
import { socket } from "../socket"; // Make sure socket.js exists in src
import axios from "axios";

export default function Chat({ user, selectedChannel }) {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedChannel) return;

    // Join the selected channel
    socket.emit('joinChannel', { channelId: selectedChannel._id });

    // Load existing messages
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_API_URL}/api/messages/channel/${selectedChannel._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => setMessages(res.data));

    // Listen for incoming messages
    socket.on('receiveGroupMessage', (message) => {
      if (message.to === selectedChannel._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Clean up
    return () => {
      socket.off('receiveGroupMessage');
    };
  }, [selectedChannel]);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit('sendGroupMessage', {
      from: user._id,
      channelId: selectedChannel._id,
      content: msg
    });
    setMessages(prev => [...prev, { from: 'Me', content: msg }]);
    setMsg('');
  };

  return (
    <div className="border p-3 rounded text-light">
      <div style={{ height: '250px', overflowY: 'scroll' }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.from === 'Me' ? 'Me' : m.from}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="input-group mt-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="form-control"
          placeholder="Message..."
        />
        <button onClick={send} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
}
