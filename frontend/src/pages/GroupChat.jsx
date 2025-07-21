import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

export default function GroupChat({ user }) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/channels`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChannels(res.data))
      .catch((err) => console.error('Error fetching channels', err));
  }, []);

  useEffect(() => {
    if (!selectedChannel) return;

    socket.emit('joinChannel', { channelId: selectedChannel._id });

    const token = localStorage.getItem('token');
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/messages/channel/${selectedChannel._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Error fetching group messages', err));

    socket.on('receiveGroupMessage', (message) => {
      if (message.to === selectedChannel._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('receiveGroupMessage');
    };
  }, [selectedChannel]);

  const sendMessage = () => {
    if (!msg.trim() || !selectedChannel) return;

    const token = localStorage.getItem('token');

    if (scheduleTime) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/messages/schedule`,
          {
            to: selectedChannel._id,
            content: msg,
            scheduledFor: scheduleTime,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          alert('✅ Message scheduled successfully');
          setMsg('');
          setScheduleTime('');
        })
        .catch((err) => {
          console.error('Error scheduling message', err);
          alert('❌ Failed to schedule message');
        });
    } else {
      const messagePayload = {
        from: user._id,
        channelId: selectedChannel._id,
        content: msg,
      };

      socket.emit('sendGroupMessage', messagePayload);
      setMessages((prev) => [...prev, { ...messagePayload, from: 'Me' }]);
      setMsg('');
    }
  };

  return (
    <div className="container-fluid py-2 mt-1 ">
      <h2 className='text-center text-light p-2'>Group Chat</h2>
      <div className="row">
        {/* Channels Sidebar */}
        <div className="col-md-4 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Your Channels</h5>
            </div>
            <ul className="list-group list-group-flush">
              {channels.map((c) => (
                <li
                  key={c._id}
                  className={`list-group-item list-group-item-action ${
                    selectedChannel?._id === c._id ? 'active' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedChannel(c);
                    setMessages([]);
                  }}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-md-8 col-lg-9">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {selectedChannel ? selectedChannel.name : 'Select a Channel'}
              </h5>
            </div>

            <div
              className="card-body overflow-auto"
              style={{ height: '350px', backgroundColor: '#f8f9fa' }}
            >
              {messages.length > 0 ? (
                messages.map((m, i) => (
                  <div key={i} className="mb-2">
                    <strong>{m.from === 'Me' ? 'Me' : m.from?.username || 'User'}:</strong>{' '}
                    {m.content}
                  </div>
                ))
              ) : (
                <p className="text-muted">No messages yet.</p>
              )}
            </div>

            {selectedChannel && (
              <div className="card-footer">
                <div className="input-group mb-2">
                  <input
                    className="form-control"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button className="btn btn-success" onClick={sendMessage}>
                    {scheduleTime ? 'Schedule' : 'Send'}
                  </button>
                </div>

                <div className="input-group">
                  <span className="input-group-text">Schedule for</span>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setScheduleTime('')}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
