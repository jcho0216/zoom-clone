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
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");
    })
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye"))
    })

})


server.listen(3000, handleListen);  