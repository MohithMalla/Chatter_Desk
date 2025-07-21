require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cron = require('node-cron');
const Message = require('./model/Message');

// Routes
const authRoutes = require('./routes/auth');
const workspaceRoutes = require('./routes/workspaces');
const channelRoutes = require('./routes/Channel');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/messages', messageRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const onlineUsers = new Map();

// Sockets
io.on('connection', (socket) => {
  console.log(` New user connected: ${socket.id}`);

  socket.on('error', (err) => {
    console.error(` Socket error: ${err.message}`);
  });

  socket.on('join', ({ userId }) => {
    onlineUsers.set(userId, socket.id);
    console.log(` User ${userId} connected`);
  });

  socket.on('joinChannel', ({ channelId }) => {
    socket.join(channelId);
    console.log(` Joined channel: ${channelId}`);
  });

  socket.on('sendMessage', async ({ from, to, content }) => {
    try {
      const msg = new Message({ from, to, content });
      await msg.save();
      const populatedMsg = await msg.populate('from', 'username');

      const receiverSocket = onlineUsers.get(to);
      if (receiverSocket) {
        socket.to(receiverSocket).emit('receiveMessage', populatedMsg);
      }
    } catch (err) {
      console.error(' Error sending direct message:', err.message);
    }
  });

  socket.on('sendGroupMessage', async ({ from, channelId, content }) => {
    try {
      const msg = new Message({ from, to: channelId, content });
      await msg.save();
      const populatedMsg = await msg.populate('from', 'username');

      socket.to(channelId).emit('receiveGroupMessage', populatedMsg);
    } catch (err) {
      console.error(' Error sending group message:', err.message);
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log(` user disconnected: ${socket.id}`);
  });
});

cron.schedule('*/30 * * * * *', async () => {
  try {
    const now = new Date();
    const scheduledMessages = await Message.find({
      scheduledFor: { $lte: now },
      sent: false,
    }).populate('from', 'username');

    for (const msg of scheduledMessages) {
      const toId = msg.to?.toString();
      const receiverSocket = onlineUsers.get(toId);

      if (msg.isGroup) {
        io.to(toId).emit('receiveGroupMessage', msg);
      } else if (receiverSocket) {
        io.to(receiverSocket).emit('receiveMessage', msg);
      }

      msg.sent = true;
      msg.sentAt = now;
      await msg.save();
    }

    if (scheduledMessages.length > 0) {
      console.log(` Sent ${scheduledMessages.length} scheduled message(s)`);
    }
  } catch (err) {
    console.error(' Cron job error:', err.message);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`port :  ${PORT}`));
