
const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("5000", () => {
  console.log("Server Running on Port 5000...");
});

app.get('/', (req, res) => {
  res.send("Node Server is running. yet!!")
})

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  const chatRoomId = socket.handshake.query['chatRoomId'];      
  const userId  = socket.handshake.query['userId'];
  console.log(chatRoomId)
  console.log(userId);

  socket.join(chatRoomId)
  socket.on("message", (data) => {
   // socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    receiverChatID = data.receiverChatID
    console.log(data);
    socket.to(chatRoomId).emit("receive_message", data);
  });

 

  socket.on("disconnect", () => {
    socket.leave(chatRoomId)
    socket.leave('Android')
    console.log("USER DISCONNECTED");
  });

  
});
