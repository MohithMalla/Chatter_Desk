// socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  autoConnect: false, // prevents automatic connection if server is unavailable
  transports: ["websocket"], // avoids fallback polling issues
});
