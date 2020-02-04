var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let currentUsers = 0;

io.on("connection", function(socket) {
  currentUsers += 1;
  console.log(`${currentUsers} online now`);
  socket.on("disconnect", () => {
    currentUsers -= 1;
    console.log(`${currentUsers} online now`);
  });
  socket.on("register", info => console.log(info));
  socket.on("chatMessage", msg => {
    console.log(msg);
    io.emit("chatMessage", msg);
  });
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
