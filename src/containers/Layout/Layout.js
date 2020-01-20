import React, { Component, useState } from "react";
import Aux from "../../hoc/Auxx";
import Navigation from "../../compontents/Navigation/Navigation";
import styles from "./Layout.module.css";
import ChatPage from "../../compontents/Pages/ChatPage/ChatPage";
import SideMenu from "../../compontents/SideMenu/SideMenu";
import io from "socket.io-client";

let socket;

class Layout extends Component {
  state = {
    chatrooms: [
      {
        topic: "Topic",
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
        ]
      }
    ],
    showDm: true,
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
    ]
  };

  toggleChat = () => {
    let stateCopy = { ...this.state };
    stateCopy.showDm = !this.state.showDm;
    this.setState(stateCopy);
  };

  render() {
    if (!socket) {
      socket = io(":4000");
    }
    return (
      <Aux>
        <Navigation />
        <main className={styles.MainContainer}>
          <SideMenu showDm={this.state.showDm} toggle={this.toggleChat} />
          <ChatPage msgs={this.state.messages} />
        </main>
      </Aux>
    );
  }
}

export default Layout;
