const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let currentUsers = 0;
let userDB = [];
let usersOnline = [];

let authenticateKey = (name, key) => {
  const account = usersOnline.find(acc => acc.user === name);
  return key === account.key;
};

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
      }
    }
    socket.emit("registerStatus", regiStasus);
  });

  socket.on("login", info => {
    let userLoggingIn = userDB.find(
      user => user.username.toLowerCase() === info.username.toLowerCase()
    );
    if (userLoggingIn == null) {
      socket.emit("loginStatus", { success: false });
    } else {
      if (userLoggingIn.password === info.password) {
        usersOnline.push({
          user: userLoggingIn.username,
          key: Math.floor(100000 + Math.random() * 900000)
        });
        socket.emit("loginStatus", {
          success: true,
          user: userLoggingIn.username
        });
        console.log(usersOnline);
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
