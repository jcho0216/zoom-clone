const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul")
    const li = document.createElement("li");
    li.innerText = message;
    console.log(message);
    ul.appendChild(li);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter-room", input.value, showRoom)
    roomName = input.value;
    input.value = "";
}

form.addEventListener('submit', handleRoomSubmit);

socket.on("welcome", () => {
    console.log("wassup");
    addMessage("Someone Joined");
});

socket.on("bye", () => {
    addMessage("Someone Left");
})