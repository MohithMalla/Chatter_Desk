import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import GroupChat from './pages/GroupChat';
import CreateWorkspace from './pages/CreateWorkspace';
import UserChannelView from './pages/UserChannelView';
import CreateChannel from './pages/CreateChannel';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Protected Routes */}
        {user && (
          <>
            <Route
              path="/workspace/:workspaceId/channel/:channelId"
              element={
                <ProtectedRoute user={user} allowedRoles={['admin', 'user']}>
                  <UserChannelView user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/messages/message"
              element={
                <ProtectedRoute user={user} allowedRoles={['admin', 'user']}>
                  <GroupChat user={user} />
                </ProtectedRoute>
              }
            />

            {/* Admin-only Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <AdminDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/workspaces"
              element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <CreateWorkspace user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/channels"
              element={
                <ProtectedRoute user={user} allowedRoles={['admin']}>
                  <CreateChannel user={user} />
                </ProtectedRoute>
              }
            />

            {/* User-only Route */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute user={user} allowedRoles={['user']}>
                  <UserDashboard user={user} />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
