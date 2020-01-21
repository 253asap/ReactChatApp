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
            message:
              "Hello this is a test message on the chat application I am creating."
          },
          {
            user: "Deku",
            message:
              "Hello there bro this is a normal message that is not a test just random stuff I am typing lol."
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
              "Hello this is a test message on the chat application I am creating."
          },
          {
            user: "Deku",
            message:
              "Hello there bro this is a normal message that is not a test just random stuff I am typing lol."
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
              "Hello this is a test message on the chat application I am creating."
          },
          {
            user: "Deku",
            message:
              "Hello there bro this is a normal message that is not a test just random stuff I am typing lol."
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
              "Hello this is a test message on the chat application I am creating."
          },
          {
            user: "Deku",
            message:
              "Hello there bro this is a normal message that is not a test just random stuff I am typing lol."
          }
        ],
        active: false
      }
    ],
    showDm: false,
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

  pagechecker = () => {
    let pageToRender = this.state.chatrooms.filter(
      page => page.active === true
    );
    return pageToRender;
  };

  pageChanger = topic => {
    let stateCopy = { ...this.state };
    stateCopy.chatrooms.forEach(room => (room.active = false));
    let roomIndex = stateCopy.chatrooms.findIndex(t => t.topic === topic);
    stateCopy.chatrooms[roomIndex].active = true;
    this.setState(stateCopy);
  };

  render() {
    if (!socket) {
      socket = io(":4000");
    }
    this.pagechecker();
    return (
      <Aux>
        <Navigation />
        <main className={styles.MainContainer}>
          <SideMenu
            showDm={this.state.showDm}
            toggle={this.toggleChat}
            chats={this.state.chatrooms}
            onclick={this.pageChanger}
          />
          <ChatPage
            msgs={this.pagechecker()[0].messages}
            topic={this.pagechecker()[0].topic}
          />
        </main>
      </Aux>
    );
  }
}

export default Layout;
