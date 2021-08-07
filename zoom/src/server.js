import http from 'http';
import socketIo from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    })

    socket.on("enter-room", (roomName, done) => {       
        console.log(roomName);
        socket.join(roomName);
        done();
    })

})

// const wss = new WebSocket.Server({ server });

// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push (socket); 
//     socket["nickname"] = "익명"
//     console.log("Connected to Browser");
//     socket.on("close", () => {
//         console.log("Disconnected from the Browser")
//     })
//     socket.on("message", (message) => {
//         const parsed = JSON.parse(message);
//         switch(parsed.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${parsed.payload}`));
//                 break;
//             case "nickname":
//                 socket["nickname"] = parsed.payload;        
//                 break;
//         }
//     })
// })

server.listen(3000, handleListen);  