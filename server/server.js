const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017');

async function connectToDb() {
  try {
    await mongoClient.connect();
    db = mongoClient.db('chat-app');
    console.log('Connected to MongoDB');
    
    // Only start listening for socket connections after DB is connected
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('user_login', async (username) => {
        console.log('User logged in:', username);
        onlineUsers.set(socket.id, username);
        io.emit('online_users', Array.from(onlineUsers.values()));

        try {
          const messages = await db.collection('messages')
            .find()
            .sort({ timestamp: -1 })
            .limit(50)
            .toArray();
          socket.emit('previous_messages', messages.reverse());
        } catch (error) {
          console.error('Error loading messages:', error);
        }
      });

      socket.on('send_message', async (messageData) => {
        console.log('Received message:', messageData);
        const message = {
          ...messageData,
          timestamp: new Date(),
          socketId: socket.id
        };

        try {
          await db.collection('messages').insertOne(message);
          io.emit('new_message', message);
        } catch (error) {
          console.error('Error saving message:', error);
        }
      });

      socket.on('disconnect', () => {
        onlineUsers.delete(socket.id);
        io.emit('online_users', Array.from(onlineUsers.values()));
        console.log('User disconnected:', socket.id);
      });
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Track online users
const onlineUsers = new Map();

const PORT = process.env.PORT || 3001;

// Start server only after DB connection is established
async function startServer() {
  await connectToDb();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
