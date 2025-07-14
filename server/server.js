// server.js - Supports pagination

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = {};
const messages = [];
const typingUsers = {};

function getUsersInRoom(room) {
  return Object.values(users).filter((u) => u.room === room);
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('user_join', ({ username, room }) => {
    users[socket.id] = { username, id: socket.id, room };
    socket.join(room);
    io.to(room).emit('user_list', getUsersInRoom(room));
    io.to(room).emit('user_joined', { username, id: socket.id });
  });

  socket.on('send_message', (messageData) => {
    const user = users[socket.id];
    const message = {
      ...messageData,
      id: Date.now(),
      sender: user?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room: user.room,
      readBy: [socket.id],
    };
    messages.push(message);
    if (messages.length > 100) messages.shift();
    io.to(user.room).emit('receive_message', message);
  });

  socket.on('get_old_messages', ({ room, skip = 0, limit = 10 }) => {
    const roomMessages = messages
      .filter((m) => m.room === room)
      .sort((a, b) => b.id - a.id) // latest first
      .slice(skip, skip + limit)
      .reverse(); // oldest first for UI
    socket.emit('old_messages', roomMessages);
  });

  socket.on('add_reaction', ({ messageId, emoji, username }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      if (!msg.reactions) msg.reactions = [];
      msg.reactions.push({ emoji, username });
      io.to(msg.room).emit('message_reaction', { messageId, emoji, username });
    }
  });

  socket.on('read_message', ({ messageId, userId }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg && !msg.readBy.includes(userId)) {
      msg.readBy.push(userId);
      io.to(msg.room).emit('message_read', { messageId, userId });
    }
  });

  socket.on('typing', (isTyping) => {
    const user = users[socket.id];
    if (user) {
      typingUsers[socket.id] = isTyping ? user.username : undefined;
      io.to(user.room).emit('typing_users', Object.values(typingUsers).filter(Boolean));
    }
  });

  socket.on('private_message', ({ to, message }) => {
    const user = users[socket.id];
    const messageData = {
      id: Date.now(),
      sender: user?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit('user_left', { username: user.username, id: socket.id });
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.to(user.room).emit('user_list', getUsersInRoom(user.room));
    }
  });
});

app.get('/', (req, res) => res.send('Socket.io Chat Server is running'));
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
