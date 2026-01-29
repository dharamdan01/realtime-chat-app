const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.sendFile("./public/index.html");
});

io.on("connection", (socket) => {
    console.log("client is connected");
    // socket.broadcast.emit("broadcast message", `hello Socket Id: ${socket.id}`);

    socket.on('chat message', (msg) => {
        msg.id = socket.id;
        io.emit('chat message', msg);
    })

    socket.on("disconnect", (disconnect) => {
        console.log("client is disconnected");
    })
    
});





server.listen(3000, () => {
    console.log("listening on *:3000");
})

