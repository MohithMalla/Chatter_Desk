// /client/src/pages/CreateChannel.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateChannel({ user }) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceId, setWorkspaceId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') return navigate('/api/channels');

    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const [userRes, wsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/workspaces`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setUsers(userRes.data);
        setWorkspaces(wsRes.data);
      } catch (err) {
        console.error("Failed to fetch users or workspaces:", err);
      }
    };

    fetchData();
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/channels`, {
        name,
        members,
        workspaceId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Channel creation failed:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Create Channel</h3>
          <form onSubmit={handleSubmit}>
            {/* Channel Name */}
            <div className="mb-3">
              <label className="form-label">Channel Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter channel name"
                required
              />
            </div>

            {/* Workspace Dropdown */}
            <div className="mb-3">
              <label className="form-label">Workspace</label>
              <select
                className="form-select"
                onChange={(e) => setWorkspaceId(e.target.value)}
                required
              >
                <option value="">-- Select Workspace --</option>
                {workspaces.map(ws => (
                  <option key={ws._id} value={ws._id}>{ws.name}</option>
                ))}
              </select>
            </div>

            {/* Members Multi-Select */}
            <div className="mb-3">
              <label className="form-label">Add Members</label>
              <select
                className="form-select"
                multiple
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                  setMembers(selected);
                }}
              >
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.username}</option>
                ))}
              </select>
              <div className="form-text">Hold Ctrl or Cmd to select multiple users</div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Create Channel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
