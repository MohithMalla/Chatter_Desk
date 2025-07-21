// WorkspaceLayout.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function WorkspaceLayout({ user }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [channels, setChannels] = useState([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/workspaces`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkspaces(res.data);
    };
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    // Extract workspaceId from URL if exists
    const pathParts = pathname.split('/');
    const wId = pathParts.includes('workspace') ? pathParts[pathParts.indexOf('workspace') + 1] : null;

    if (wId && wId !== currentWorkspaceId) {
      setCurrentWorkspaceId(wId);

      const fetchChannels = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/channels/workspace/${wId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannels(res.data);
      };

      fetchChannels();
    }
  }, [pathname]);

  return (
    <div className="d-flex text-light">
      <Sidebar
        user={user}
        workspaces={workspaces}
        channels={channels}
        currentWorkspaceId={currentWorkspaceId}
      />
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
}
