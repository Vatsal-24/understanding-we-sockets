const { Server } = require("socket.io");

const PORT = 9000;
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("sendMessage", (message) => {
    // send everyone except the sender
    socket.broadcast.emit("receiveMessage", message);
    // send everyone including the sender
    // io.emit("receiveMessage", message);
  });
});
