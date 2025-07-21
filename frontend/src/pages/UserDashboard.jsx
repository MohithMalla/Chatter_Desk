import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.heading}>
          Welcome back, <span style={styles.username}>{user?.name || 'Chatter'}</span> 👋
        </h1>
        <p style={styles.subtext}>
          Your personalized ChatterDesk — message, collaborate, and manage your schedules like a pro.
        </p>

        <div style={styles.grid}>
          <DashboardCard
            title="💬 Join a Channel"
            description="Jump into your favorite channel and connect with your team instantly."
            onClick={() => navigate('/workspace/yourWorkspaceId/channel/yourChannelId')}
          />

          <DashboardCard
            title="📅 Scheduled Messages"
            description="View and manage all your upcoming scheduled messages in one place."
            onClick={() => navigate('/api/messages/message')}
          />

          <DashboardCard
            title="🌐 Explore Workspaces"
            description="Browse, join, or manage workspaces you’re part of."
            onClick={() => navigate('/workspace')}
          />
        </div>

        <footer style={styles.footer}>
          ⚡ Powered by <span style={styles.brand}>ChatterDesk</span>
        </footer>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardText}>{description}</p>
      <button style={styles.button}>Go</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1f22',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '40px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#ffffff',
  },
  username: {
    color: '#7289da',
  },
  subtext: {
    color: '#b9bbbe',
    marginBottom: '40px',
    fontSize: '1.1rem',
  },
  grid: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#2f3136',
    padding: '24px',
    borderRadius: '12px',
    width: '300px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #232428',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: '1.3rem',
    marginBottom: '10px',
  },
  cardText: {
    color: '#b9bbbe',
    fontSize: '0.95rem',
    flexGrow: 1,
  },
  button: {
    marginTop: '20px',
    padding: '8px 12px',
    backgroundColor: '#5865f2',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    alignSelf: 'flex-start',
  },
  footer: {
    marginTop: '60px',
    textAlign: 'center',
    color: '#777',
    fontSize: '0.9rem',
  },
  brand: {
    color: '#7289da',
    fontWeight: 'bold',
  },
};
