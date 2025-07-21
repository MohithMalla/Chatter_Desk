import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from '../pages/Chat';

export default function UserChannelView({ user }) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_API_URL}/api/channels`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => setChannels(res.data));
  }, []);

  return (
    <div className="container mt-4 text-light">
      <h4>Welcome, {user.username}</h4>

      <div className="mb-3">
        <label className="form-label">Your Channels:</label>
        <ul className="list-group">
          {channels.map((ch) => (
            <li
              key={ch._id}
              className={`list-group-item ${selectedChannel?._id === ch._id ? 'active' : ''}`}
              onClick={() => setSelectedChannel(ch)}
              style={{ cursor: 'pointer' }}
            >
              {ch.name} <small className="text-muted">({ch.workspace?.name})</small>
            </li>
          ))}
        </ul>
      </div>

      {selectedChannel && (
        <div className="mt-4">
          <h5>Chatting in: {selectedChannel.name}</h5>
          <Chat user={user} selectedChannel={selectedChannel} />
        </div>
      )}
    </div>
  );
}
