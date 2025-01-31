# Real-Time Chat Application

A full-stack real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## Features

- 🚀 Real-time messaging
- 👥 Online user tracking
- 📎 File and image sharing
- 💬 Message history
- 📱 Responsive design
- 🔄 Auto-scroll with new message notification
- 💾 Persistent storage with MongoDB
- 🔥 And more...

## Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- Socket.IO Client

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

bash,
git clone https://github.com/mwnseo/video-chat-app.git,
cd video-chat-app

2. Install frontend dependencies

bash,
cd video-chat-app,
npm install

3. Install backend dependencies

bash,
cd ../server,
npm install

4. Start MongoDB service

5. Start the backend server

bash,
cd server,
node server.js

6. Start the frontend development server

bash,
cd video-chat-app,
npm run dev

The application should now be running at `http://localhost:5173`

## Usage

1. Open the application in your browser
2. Enter a username to join the chat
3. Start sending messages
4. Upload files by clicking the attachment button
5. See online users in the top right corner
6. Messages are automatically saved and loaded from the database

## Project Structure

```
video-chat-app/
├── video-chat-app/ # Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ └── App.jsx
│ └── package.json
│
└── server/ # Backend
├── server.js
└── package.json
```
