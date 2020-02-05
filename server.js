const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let currentUsers = 0;
let userDB = [];
let usersOnline = [];

io.on("connection", function(socket) {
  currentUsers += 1;
  console.log(`${currentUsers} online now`);
  socket.on("disconnect", () => {
    currentUsers -= 1;
    console.log(`${currentUsers} online now`);
  });

  socket.on("register", info => {
    console.log(info);
    const regiStasus = { username: false };
    if (info.username.length > 0 && info.username.match(/^[a-zA-Z0-9_]*$/)) {
      regiStasus.username = true;
      userDB.push({ username: info.username, password: info.password });
    }
    io.emit("registerStatus", regiStasus);
    console.log(info);
  });

  socket.on("chatMessage", msg => {
    console.log(msg);
    io.emit("chatMessage", msg);
  });
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
