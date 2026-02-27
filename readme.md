<div align="center">

# 💬 SyncChat Application

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

A **production-ready real-time chat application** featuring a WhatsApp-inspired interface, built with Socket.IO for bi-directional WebSocket communication. Messages are instantly broadcasted to all connected users with smooth animations and a live Online/Offline connection status indicator.

---

## ✨ Features

### ⚡ **Real-Time Messaging**
- Instant message delivery with zero latency
- No page refresh required
- WebSocket-powered communication
- Automatic message synchronization

### 🎨 **WhatsApp-Style UI**
- **Sent Messages** — Green bubbles, right-aligned with slide-in animation
- **Received Messages** — White bubbles, left-aligned with slide-in animation
- Responsive design for all screen sizes
- Modern, clean interface with WhatsApp color palette

### 🟢 **Live Connection Status**
- Animated **Online** button with pulsing green indicator when connected
- Switches to **Offline** (red) automatically on disconnection
- Smooth hover and scale transitions on the status button

### 🎞️ **Message Animations**
- Sent messages slide in from the **right**
- Received messages slide in from the **left**
- Smooth CSS `@keyframes` animations for every new message

### 📡 **Broadcasting System**
- Messages delivered to all connected clients simultaneously
- Socket ID-based sender identification (sent vs received)
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
│  │  Chat Header: 💬 SyncChat          [🟢 Online]     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Chat Window (index.html)                           │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  ← Hello! How are you?   [received/white]   │   │   │
│  │  │                                              │   │   │
│  │  │         I'm good, thanks! →  [sent/green]   │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │  Input: [Type a message...]              [➤]       │   │
│  └──────────────────┬──────────────────────────────────┘   │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ Socket.IO Connection
                      ▼
┌─────────────────────────────────────────────────────────────┐
│               Express + Socket.IO Server                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Event: 'chat message'                               │  │
│  │  1. Receive { id, value } from client               │  │
│  │  2. Attach sender's socket.id                        │  │
│  │  3. Broadcast to ALL clients (io.emit)               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┼───────────────────────────────────────┘
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
// 1. User types and submits a message
socket.emit('chat message', { id: "", value: input.value });

// 2. Receive broadcasted messages from server
socket.on('chat message', function (msg) {
    let item = document.createElement('li');
    item.textContent = msg.value;

    if (socket.id !== msg.id) {
        item.classList.add('received');   // White bubble, slides in from left
    } else {
        item.classList.add('sent');       // Green bubble, slides in from right
    }

    messages.appendChild(item);
});
```

```javascript
// SERVER SIDE (index.js)
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('chat message', (msg) => {
        msg.id = socket.id;           // Stamp sender's socket ID
        io.emit('chat message', msg); // Broadcast to ALL clients
    });
});
```

### **Connection Status Logic**

```javascript
// Fires on successful WebSocket connection
socket.on('connect', function () {
    onlineButton.textContent = '● Online';
    onlineButton.classList.remove('offline');  // Green button
});

// Fires when connection is lost
socket.on('disconnect', function () {
    onlineButton.textContent = '● Offline';
    onlineButton.classList.add('offline');     // Red button
});
```

---

## 🎨 UI Styling

### **Sent Message (You)**
```css
#messages li.sent {
    align-self: flex-end;
    background: #dcf8c6;             /* WhatsApp green */
    border-bottom-right-radius: 2px;
    animation: slideInRight 0.4s ease-out;
}
```

### **Received Message (Others)**
```css
#messages li.received {
    align-self: flex-start;
    background: #ffffff;             /* White */
    border-bottom-left-radius: 2px;
    animation: slideInLeft 0.4s ease-out;
}
```

### **Online / Offline Status Button**
```css
.online-button {
    background: #10b981;             /* Green when online */
    border-radius: 20px;
    animation: pulse 2s infinite;   /* Pulsing dot */
}

.online-button.offline {
    background: #ef4444;             /* Red when offline */
}
```

---

## 🔧 Customization

### **Change Port**
```javascript
// index.js
const PORT = process.env.PORT || 3000;
```

### **Add Username Support**

**Client-side:**
```javascript
const username = prompt("Enter your name:");
socket.emit('chat message', { id: "", value: input.value, user: username });
```

**Server-side:**
```javascript
socket.on('chat message', (msg) => {
    msg.id = socket.id;
    io.emit('chat message', msg);
});
```

**Display in message:**
```javascript
item.textContent = `${msg.user}: ${msg.value}`;
```

### **Add Timestamps**
```javascript
// Server-side
msg.id = socket.id;
msg.time = new Date().toLocaleTimeString();
io.emit('chat message', msg);

// Client-side
item.textContent = `${msg.value}  ${msg.time}`;
```

---

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/chat-interface.png" alt="WhatsApp-Style Chat Interface" width="800"/>
  <p><i>Clean, responsive chat interface with animated sent/received message bubbles and live connection status</i></p>
</div>

---

## 🗺️ Roadmap

- [x] **WhatsApp-Style UI** — Green/white message bubbles
- [x] **Message Animations** — Slide-in from left/right
- [x] **Online/Offline Status** — Live connection indicator with pulse animation
- [ ] **User Authentication** — Login system with usernames
- [ ] **Typing Indicators** — "User is typing..." status
- [ ] **Private Messaging** — One-on-one chat rooms
- [ ] **Group Chats** — Multiple chat channels
- [ ] **Message History** — Persistent storage with MongoDB
- [ ] **File Sharing** — Image and document uploads
- [ ] **Emoji Picker** — Native emoji support
- [ ] **Read Receipts** — Message seen/delivered status
- [ ] **Push Notifications** — Desktop alerts
- [ ] **Dark Mode** — Theme toggle

---

## 🐛 Troubleshooting

**Problem:** Messages not appearing

**Solution:** Check browser console for errors
```javascript
socket.on('connect_error', (err) => {
    console.error('Connection failed:', err);
});
```

---

**Problem:** Status button stuck on Offline

**Solution:** Ensure the server is running and Socket.IO is correctly served. The `connect` event fires only after a successful handshake.

---

**Problem:** Port 3000 already in use

**Solution:**
```bash
# Find and kill process
lsof -i :3000        # Mac/Linux
netstat -ano | findstr :3000   # Windows

# Or use a different port
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
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)

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