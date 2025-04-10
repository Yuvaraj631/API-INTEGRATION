const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const Message = require('./model');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat message', async (msg) => {
    const newMsg = new Message(msg);
    await newMsg.save();
    io.emit('chat message', newMsg);
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});

app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.json(messages);
});

server.listen(5000, () => console.log('Server running at http://localhost:5000'));
