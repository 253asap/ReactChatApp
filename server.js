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
    const regiStasus = { username: false };
    if (info.username.length > 0 && info.username.match(/^[a-zA-Z0-9_]*$/)) {
      let userRegistering = userDB.find(
        user => user.username.toLowerCase() === info.username.toLowerCase()
      );
      if (userRegistering == null) {
        regiStasus.username = true;
        userDB.push({ username: info.username, password: info.password });
        console.log(userDB);
      }
    }
    socket.emit("registerStatus", regiStasus);
  });

  socket.on("login", info => {
    let userLoggingIn = userDB.find(
      user => user.username.toLowerCase() === info.username.toLowerCase()
    );
    if (userLoggingIn == null) {
      console.log(userLoggingIn);
      socket.emit("loginStatus", { success: false });
    } else {
      console.log(userLoggingIn.password === info.password);
      if (userLoggingIn.password === info.password) {
        socket.emit("loginStatus", {
          success: true,
          user: userLoggingIn.username
        });
      } else {
        socket.emit("loginStatus", { success: false });
      }
    }
  });

  socket.on("chatMessage", msg => {
    console.log(msg);
    io.emit("chatMessage", msg);
  });
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
