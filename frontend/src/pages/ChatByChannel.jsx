
// ChatByChannel.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io(import.meta.env.VITE_API_URL);

export default function ChatByChannel({ user }) {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    socket.emit('joinChannel', { channelId });

    socket.on('receiveGroupMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveGroupMessage');
    };
  }, [channelId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages?channelId=${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    };
    fetchMessages();
  }, [channelId]);

  const sendGroupMessage = () => {
    if (newMsg.trim()) {
      socket.emit('sendGroupMessage', {
        from: user._id,
        channelId,
        content: newMsg,
      });
      setMessages((prev) => [...prev, { from: 'Me', content: newMsg }]);
      setNewMsg('');
    }
  };

  return (
    <div className="p-3 text-light">
      <h4># Channel Chat</h4>
      <div className="border rounded p-2 bg-light mb-3" style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.from?.username || 'Me'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          className="form-control"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-primary" onClick={sendGroupMessage}>Send</button>
      </div>
    </div>
  );
}
