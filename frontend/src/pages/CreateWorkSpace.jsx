// /client/src/pages/CreateWorkspace.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateWorkspace({ user }) {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') return navigate('/chat');

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.filter(u => u._id !== user._id));
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/workspaces`, {
        name,
        memberIds: selectedUsers
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error creating workspace:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 bg-light">
        <h3 className="text-center text-success mb-4">Create New Workspace</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Workspace Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Workspace Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Add Members</label>
            <select
              className="form-select"
              multiple
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedUsers(selected);
              }}
              size={Math.min(users.length, 6)} // Responsive size for options
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.username} ({u.email})
                </option>
              ))}
            </select>
            <small className="text-muted">Hold Ctrl (or ⌘ on Mac) to select multiple users</small>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success fw-bold">
              Create Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
