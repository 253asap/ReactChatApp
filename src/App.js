import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Aux from "./hoc/Auxx";
import Layout from "./containers/Layout/Layout";
import LoginPage from "./compontents/Pages/LoginPage/LoginPage";
import RegisterPage from "./compontents/Pages/RegisterPage/RegisterPage";
import io from "socket.io-client";

let socket;

class App extends React.Component {
  state = { loginKey: "", chatrooms: [], user: { name: "", messages: [] } };
  render() {
    if (!socket) {
      socket = io(":4000");
    }
    socket.on("chatMessage", msg => console.log(msg));
    return (
      <Router>
        <Aux>
          <Switch>
            <Route
              path="/"
              exact
              render={props => <Layout {...props} socket={socket} />}
            />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Aux>
      </Router>
    );
  }
}

export default App;
