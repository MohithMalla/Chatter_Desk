import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatterDeskLogo from '../pages/ChatterDeskLogo';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserLoggedIn(true);
      setUserRole(user.role); // 'admin' or 'user'
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserLoggedIn(false);
    navigate('/login');
    window.location.reload(); // reset state
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDashboardPath = () => {
    return userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';
  };

  if (!userLoggedIn) return null;

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center">
        <ChatterDeskLogo />
        {isMobile ? (
          <button className="btn btn-outline-light" onClick={toggleSidebar}>☰</button>
        ) : (
          <div className="d-flex align-items-center">
            <ul className="navbar-nav flex-row me-3">
              <li className="nav-item mx-2">
                <Link className="nav-link" to={getDashboardPath()}>Home</Link>
              </li>
              {userRole === 'admin' && (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to="/api/channels">Create Channel</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to="/api/workspaces">Create Workspace</Link>
                  </li>
                </>
              )}
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/api/messages/message">Group Chat</Link>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>

      {/* Sidebar for Mobile */}
      {isMobile && showSidebar && (
        <div className="bg-dark text-white p-3 position-fixed top-0 start-0 vh-100" style={{ zIndex: 1050, width: '250px' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>Menu</h5>
            <button className="btn btn-outline-light btn-sm" onClick={toggleSidebar}>✖</button>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to={getDashboardPath()} onClick={toggleSidebar}>Home</Link>
            </li>
            {userRole === 'admin' && (
              <>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/api/channels" onClick={toggleSidebar}>Create Channel</Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/api/workspaces" onClick={toggleSidebar}>Create Workspace</Link>
                </li>
              </>
            )}
            <li className="nav-item mb-4">
              <Link className="nav-link text-white" to="/api/messages/message" onClick={toggleSidebar}>Group Chat</Link>
            </li>
            <button className="btn btn-outline-light" onClick={() => { toggleSidebar(); handleLogout(); }}>Logout</button>
          </ul>
        </div>
      )}
    </>
  );
}
