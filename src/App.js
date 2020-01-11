import React, { Component } from "react";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import ChatPage from "./compontents/Pages/ChatPage/ChatPage";
import SideMenu from "./compontents/SideMenu/SideMenu";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SideMenu />
          <ChatPage />
        </Layout>
      </div>
    );
  }
}

export default App;
