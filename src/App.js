import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Aux from "./hoc/Auxx";
import Layout from "./containers/Layout/Layout";
import LoginPage from "./compontents/Pages/LoginPage/LoginPage";
import RegisterPage from "./compontents/Pages/RegisterPage/RegisterPage";
import io from "socket.io-client";

let socket = io(":4000");

class App extends React.Component {
  state = {
    chatrooms: [
      {
        topic: "Anime/Manga",
        messages: [
          {
            user: "Ishigami Senku",
            message:
              "Hello this is a test message on the chat application I am creating."
          },
          {
            user: "Deku",
            message:
              "Hello there bro this is a normal message that is not a test just random stuff I am typing lol."
          }
        ],
        active: true
      },
      {
        topic: "Technology",
        messages: [
          {
            user: "Ishigami Senku",
            message: "Random messages about technology blah blah blah"
          },
          {
            user: "Deku",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta orci ut velit sagittis ultricies. Donec eu ex vel dui pretium vulputate. Aliquam in nulla a ligula aliquam luctus. Morbi."
          }
        ],
        active: false
      },
      {
        topic: "Random",
        messages: [
          {
            user: "Ishigami Senku",
            message:
              "ultricies. Donec eu ex vel dui pretium vulputate. Aliquam in nulla a ligula"
          },
          {
            user: "Deku",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis vehicula nisl. Suspendisse ornare rutrum leo, et finibus ligula venenatis non. Nam eu cursus massa."
          }
        ],
        active: false
      },
      {
        topic: "Video Games",
        messages: [
          {
            user: "Ishigami Senku",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis mi sem, sed ultricies purus."
          },
          {
            user: "Deku",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt ligula quam, eu rhoncus lectus commodo eu. Sed leo magna."
          }
        ],
        active: false
      },
      {
        topic: "Fashion",
        messages: [
          {
            user: "Ishigami Senku",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue dui vel dolor feugiat, vitae dictum leo commodo. Sed et porta dui. Donec egestas justo in est pulvinar, tempor accumsan."
          },
          {
            user: "Deku",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis varius ornare. Aliquam pretium ac."
          }
        ],
        active: false
      }
    ],
    user: { name: "", messages: [], key: null }
  };

  registerUser = (user, pass) => {
    socket.emit("register", { username: user, password: pass });
    // window.location.href = "/login";
  };

  loginUser = (user, pass) => {
    socket.emit("login", { username: user, password: pass });
    // window.location.href = "/login";
  };

  updateUser = () => {
    if (this.state.user.name === "") {
      let name = sessionStorage.getItem("name");
      let key = sessionStorage.getItem("key");
      const stateCopy = { ...this.state };
      stateCopy.user.name = name;
      stateCopy.user.key = key;
      this.setState(stateCopy);
    }
  };

  sendMessage = (msg, topic, user) => {
    socket.emit("chatMessage", {
      topic: topic,
      message: msg,
      user: user
    });
    console.log("sent");
  };

  receiveMessage = message => {
    const time = new Date().toLocaleTimeString();
    const topic = message.topic;
    const stateCopy = { ...this.state };
    const roomIndex = stateCopy.chatrooms.findIndex(t => t.topic === topic);
    stateCopy.chatrooms[roomIndex].messages.push({
      message: message.message,
      user: message.user,
      time: time
    });
    this.setState(stateCopy);
  };

  componentDidMount() {
    socket.on("chatMessage", msg => {
      this.receiveMessage(msg);
    });
  }

  render() {
    return (
      <Router>
        <Aux>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Layout
                  {...props}
                  updateUser={this.updateUser}
                  user={this.state.user}
                  chatrooms={this.state.chatrooms}
                  sendMsg={this.sendMessage}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <RegisterPage
                  {...props}
                  register={this.registerUser}
                  socket={socket}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <LoginPage
                  {...props}
                  login={this.loginUser}
                  user={this.state.user}
                  socket={socket}
                />
              )}
            />
          </Switch>
        </Aux>
      </Router>
    );
  }
}

export default App;
