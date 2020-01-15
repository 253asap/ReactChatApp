import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Aux from "./hoc/Auxx";
import Layout from "./containers/Layout/Layout";
import LoginPage from "./compontents/Pages/LoginPage/LoginPage";
import RegisterPage from "./compontents/Pages/RegisterPage/RegisterPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Aux>
          <Switch>
            <Route path="/" exact component={Layout} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Aux>
      </Router>
    );
  }
}

export default App;
