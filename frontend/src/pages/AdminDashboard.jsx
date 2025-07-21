import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [channelMap, setChannelMap] = useState({});
  const [expandedWorkspaceId, setExpandedWorkspaceId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchWorkspaces = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/workspaces`,
          { headers }
        );
        setWorkspaces(res.data);

        res.data.forEach(async (ws) => {
          try {
            const channelRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/channels/workspace/${ws._id}`,
              { headers }
            );
            setChannelMap((prev) => ({
              ...prev,
              [ws._id]: channelRes.data,
            }));
          } catch (err) {
            console.error(`❌ Failed to fetch channels for ${ws.name}:`, err);
          }
        });
      } catch (err) {
        console.error("❌ Failed to fetch workspaces:", err);
        alert("Error fetching workspaces.");
      }
    };

    fetchWorkspaces();
  }, []);

  const toggleWorkspaceDetails = (workspaceId) => {
    setExpandedWorkspaceId((prevId) =>
      prevId === workspaceId ? null : workspaceId
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛠️ Admin Dashboard</h2>
      <div style={styles.grid}>
        {workspaces.length > 0 ? (
          workspaces.map((ws) => {
            const channels = channelMap[ws._id] || [];
            const isExpanded = expandedWorkspaceId === ws._id;

            return (
              <div key={ws._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.workspaceName}>{ws.name}</h3>
                  <button
                    onClick={() => toggleWorkspaceDetails(ws._id)}
                    style={styles.toggleButton}
                  >
                    {isExpanded ? "▲ Hide" : "▼ View"}
                  </button>
                </div>

                <div style={styles.cardBody}>
                  <p>
                    <strong>👥 Members:</strong>{" "}
                    <span style={styles.badge}>{ws.members?.length || 0}</span>
                  </p>
                  <p>
                    <strong>📺 Channels:</strong>{" "}
                    <span style={{ ...styles.badge, background: "#00bcd4" }}>
                      {channels.length}
                    </span>
                  </p>

                  {isExpanded && (
                    <>
                      <hr style={styles.divider} />
                      <h4 style={styles.sectionTitle}>👥 Member List</h4>
                      {ws.members?.length > 0 ? (
                        <ul style={styles.listGroup}>
                          {ws.members.map((m, i) => (
                            <li key={m?._id || `${ws._id}-m-${i}`} style={styles.listItem}>
                              {m.username || m.email || "Unknown"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={styles.muted}>No members available.</p>
                      )}

                      <h4 style={{ ...styles.sectionTitle, color: "#ffc107" }}>
                        📺 Channel List
                      </h4>
                      {channels.length > 0 ? (
                        <ul style={styles.listGroup}>
                          {channels.map((ch, i) => (
                            <li key={ch?._id || `${ws._id}-ch-${i}`} style={styles.listItem}>
                              {ch.name || "Unnamed Channel"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={styles.muted}>No channels available.</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ color: "#ccc", textAlign: "center" }}>No workspaces available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

const styles = {
  container: {
    backgroundColor: "#1e1f22",
    color: "#fff",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "2.2rem",
    color: "#ffffff",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
  },
  card: {
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "350px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    border: "1px solid #232428",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  workspaceName: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#ffffff",
  },
  toggleButton: {
    background: "none",
    border: "1px solid #ccc",
    color: "#ccc",
    padding: "4px 8px",
    fontSize: "0.85rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cardBody: {
    fontSize: "0.95rem",
    color: "#ccc",
  },
  badge: {
    background: "#7289da",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginLeft: "5px",
  },
  divider: {
    borderColor: "#555",
    margin: "15px 0",
  },
  sectionTitle: {
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#00bcd4",
  },
  listGroup: {
    listStyle: "none",
    paddingLeft: "0",
    marginBottom: "20px",
  },
  listItem: {
    backgroundColor: "#36393f",
    padding: "8px 12px",
    marginBottom: "6px",
    borderRadius: "6px",
    color: "#fff",
    border: "1px solid #444",
  },
  muted: {
    color: "#888",
    fontStyle: "italic",
    fontSize: "0.9rem",
  },
};
