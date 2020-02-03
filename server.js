var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected " + socket.id);
  socket.on("disconnect", () => console.log("gone"));
  socket.on("chatMessage", msg => {
    console.log(msg);
    io.emit("chatMessage", msg);
  });
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
