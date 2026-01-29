<div align="center">

# 💬 Real-Time Chat Application

### **WhatsApp-Style Messaging with Socket.IO**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-v4-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Type • Send • Connect** — Instant messaging powered by WebSockets

[Live Demo](#) • [Features](#-features) • [Get Started](#-quick-start)

</div>

---

## 🎯 Overview

A **production-ready real-time chat application** featuring a WhatsApp-inspired interface, built with Socket.IO for bi-directional WebSocket communication. Messages are instantly broadcasted to all connected users with visual distinction between sent and received messages.

---

## ✨ Features

### ⚡ **Real-Time Messaging**
- Instant message delivery with zero latency
- No page refresh required
- WebSocket-powered communication
- Automatic message synchronization

### 🎨 **WhatsApp-Style UI**
- **Sent Messages** - Green bubbles, right-aligned
- **Received Messages** - White bubbles, left-aligned with sender ID
- Responsive design for all devices
- Modern, clean interface

### 📡 **Broadcasting System**
- Messages delivered to all connected clients
- Sender identification with socket IDs
- Real-time user presence
- Scalable architecture

---

## 🛠️ Tech Stack

```
Backend:   Node.js + Express.js
WebSocket: Socket.IO v4
Frontend:  HTML5 + CSS3 + Vanilla JavaScript
Protocol:  WebSocket (with HTTP fallback)
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Chat Window (index.html)                           │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  Received Message (White/Left)              │   │   │
│  │  │  ┌──────────────────────┐                   │   │   │
│  │  │  │ Hello! How are you?  │ [Socket ID: abc] │   │   │
│  │  │  └──────────────────────┘                   │   │   │
│  │  │                                              │   │   │
│  │  │                   Sent Message (Green/Right)│   │   │
│  │  │                   ┌──────────────────────┐  │   │   │
│  │  │                   │ I'm good, thanks!    │  │   │   │
│  │  │                   └──────────────────────┘  │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │  Input: [Type a message...] [Send]                 │   │
│  └──────────────────┬──────────────────────────────────┘   │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ Socket.IO Connection
                      ▼
┌─────────────────────────────────────────────────────────────┐
│               Express + Socket.IO Server                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Event: 'chat message'                               │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │ 1. Receive message from client                 │ │  │
│  │  │ 2. Attach sender's socket.id                   │ │  │
│  │  │ 3. Broadcast to ALL clients (io.emit)          │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ Broadcast
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              All Connected Clients                           │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │   Client 1    │  │   Client 2    │  │   Client 3    │  │
│  │ (Sender)      │  │ (Receiver)    │  │ (Receiver)    │  │
│  │ Shows: Green  │  │ Shows: White  │  │ Shows: White  │  │
│  └───────────────┘  └───────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
realtime-chat-app/
│
├── public/
│   └── index.html           # Chat UI + Socket.IO client
│
├── index.js                 # Express server + Socket.IO
├── package.json             # Dependencies & scripts
├── .gitignore               # Git exclusions
└── README.md                # Documentation
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js v18+ installed

### **Installation**

```bash
# 1. Clone the repository
git clone https://github.com/dharamdan01/realtime-chat-app.git
cd realtime-chat-app

# 2. Install dependencies
npm install

# 3. Start the server (Development)
npm run dev

# OR Production mode
npm start

# 4. Open in browser
http://localhost:3000
```

### **Testing**
Open multiple browser tabs or windows to simulate different users chatting!

---

## 📖 How It Works

### **Message Flow**

```javascript
// CLIENT SIDE (index.html)
// 1. User types and sends message
socket.emit('chat message', messageText);

// 2. Receive broadcasted messages
socket.on('message', (msg) => {
    if (socket.id === msg.id) {
        // Display as SENT (Green/Right)
        displaySentMessage(msg.message);
    } else {
        // Display as RECEIVED (White/Left)
        displayReceivedMessage(msg.message, msg.id);
    }
});
```

```javascript
// SERVER SIDE (index.js)
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('chat message', (msg) => {
        // Broadcast to ALL clients (including sender)
        io.emit('message', {
            message: msg,
            id: socket.id  // Attach sender's ID
        });
    });
});
```

### **Message Identification Logic**

```
┌─────────────────────────────────────────────────┐
│  Incoming Message                               │
│  { message: "Hello!", id: "abc123" }           │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Compare Socket IDs   │
        │  socket.id === msg.id │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
    ┌─────────┐           ┌─────────────┐
    │  Match  │           │  No Match   │
    └────┬────┘           └──────┬──────┘
         │                       │
         ▼                       ▼
    ┌─────────────┐       ┌──────────────────┐
    │  SENT       │       │  RECEIVED        │
    │  Green      │       │  White           │
    │  Right ─────┤       │  ───── Left      │
    └─────────────┘       │  + Sender ID     │
                          └──────────────────┘
```

---

## 🎨 UI Styling

### **Sent Message (You)**
```css
.sent {
    background-color: #dcf8c6;  /* WhatsApp green */
    margin-left: auto;
    margin-right: 10px;
    text-align: right;
    border-radius: 10px 10px 0 10px;
}
```

### **Received Message (Others)**
```css
.received {
    background-color: #ffffff;  /* White */
    margin-left: 10px;
    margin-right: auto;
    border-radius: 10px 10px 10px 0;
}
.sender-id {
    font-size: 0.75em;
    color: #888;
}
```

---

## 🔧 Customization

### **Change Port**

**index.js:**
```javascript
const PORT = process.env.PORT || 3000;  // Change 3000 to desired port
```

### **Add Username Support**

**Client-side:**
```javascript
const username = prompt("Enter your name:");
socket.emit('chat message', { text: messageText, user: username });
```

**Server-side:**
```javascript
socket.on('chat message', (data) => {
    io.emit('message', {
        message: data.text,
        user: data.user,
        id: socket.id
    });
});
```

### **Add Timestamps**

```javascript
const timestamp = new Date().toLocaleTimeString();
io.emit('message', {
    message: msg,
    id: socket.id,
    time: timestamp
});
```

---

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/chat-interface.png" alt="WhatsApp-Style Chat Interface" width="800"/>
  <p><i>Clean, responsive chat interface with sent/received message distinction</i></p>
</div>

---

## 🗺️ Roadmap

- [ ] **User Authentication** - Login system with usernames
- [ ] **Private Messaging** - One-on-one chat rooms
- [ ] **Group Chats** - Multiple chat channels
- [ ] **Typing Indicators** - "User is typing..." status
- [ ] **Message History** - Persistent storage with MongoDB
- [ ] **File Sharing** - Image and document uploads
- [ ] **Emoji Picker** - Native emoji support
- [ ] **Read Receipts** - Message seen/delivered status
- [ ] **Online Status** - Active/inactive user indicators
- [ ] **Push Notifications** - Desktop alerts
- [ ] **Voice Messages** - Audio recording
- [ ] **Dark Mode** - Theme toggle

---

## 🐛 Troubleshooting

**Problem:** Messages not appearing

**Solution:** Check browser console for errors
```javascript
// Add to client-side
socket.on('connect_error', (err) => {
    console.error('Connection failed:', err);
});
```

---

**Problem:** Can't distinguish sent/received messages

**Solution:** Verify socket ID comparison
```javascript
// Ensure you're using ===, not ==
if (socket.id === msg.id) { /* ... */ }
```

---

**Problem:** Port 3000 already in use

**Solution:**
```bash
# Find and kill process
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Or use different port
PORT=3001 npm start
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📚 Learn More

- [Socket.IO Documentation](https://socket.io/docs/)
- [WebSocket Protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Real-Time Communication](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

---

## 📄 License

This project is licensed under the ISC License.

---

## 📧 Contact

**Dharam Dan**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dharam-dan-2584bb258/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dharamdan01)

**Project Link:** [https://github.com/dharamdan01/realtime-chat-app](https://github.com/dharamdan01/realtime-chat-app)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with ❤️ using Node.js, Express, and Socket.IO**

</div>