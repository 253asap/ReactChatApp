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
    messageToBeSent: "",
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

  clearMessage = () => {
    let stateCopy = { ...this.state };
    stateCopy.messageToBeSent = "";
    this.setState(stateCopy);
  };

  messageToBeSentUpdater = event => {
    let stateCopy = { ...this.state };
    stateCopy.messageToBeSent = event.target.value;
    this.setState(stateCopy);
  };

  sendMessageEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.sendMessage();
      event.preventDefault();
      this.clearMessage();
    }
  };

  sendMessage = () => {
    socket.emit("chatMessage", {
      topic: this.pagechecker()[0].topic,
      message: this.state.messageToBeSent,
      user: "Asa"
    });
    this.clearMessage();
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

  render() {
    if (!socket) {
      socket = io(":4000");
      socket.on("chatMessage", msg => {
        this.receiveMessage(msg);
      });
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
            messageUpdate={e => this.messageToBeSentUpdater(e)}
            msgs={this.pagechecker()[0].messages}
            topic={this.pagechecker()[0].topic}
            send={this.sendMessage}
            sendEnter={e => this.sendMessageEnter(e)}
            messageToBeSent={this.state.messageToBeSent}
          />
        </main>
      </Aux>
    );
  }
}

export default Layout;
