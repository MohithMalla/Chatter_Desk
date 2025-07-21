// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ user, workspaces = [], channels = [], currentWorkspaceId }) {
  return (
    <div className="d-flex flex-column bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h5 className="mb-3">ChatterDesk</h5>
      <p>Hello, {user?.username}</p>

      <hr />
      <h6>Workspaces</h6>
      <ul className="nav flex-column mb-3">
        {workspaces.map(ws => (
          <li className="nav-item" key={ws._id}>
            <Link
              to={`/workspace/${ws._id}`}
              className={`nav-link text-white ${ws._id === currentWorkspaceId ? 'active' : ''}`}
            >
              {ws.name}
            </Link>
          </li>
        ))}
      </ul>

      <h6>Channels</h6>
      <ul className="nav flex-column mb-3">
        {channels.map(ch => (
          <li className="nav-item" key={ch._id}>
            <Link
              to={`/workspace/${ch.workspace._id}/channel/${ch._id}`}
              className="nav-link text-white"
            >
              # {ch.name}
            </Link>
          </li>
        ))}
      </ul>

      {user?.role === 'admin' && (
        <>
          <hr />
          <h6>Admin</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-white">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/api/workspaces" className="nav-link text-white">Create Workspace</Link>
            </li>
            <li className="nav-item">
              <Link to="/api/channel" className="nav-link text-white">Create Channel</Link>
            </li>
            <li className="nav-item">
              <Link to="/api/messages/message" className="nav-link text-white">Group Chat</Link>
            </li>

          </ul>
        </>
      )}
    </div>
  );
}
