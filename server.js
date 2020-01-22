var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chatMessage", data => console.log(data));
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
