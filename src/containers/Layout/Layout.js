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
    showDm: false,
    showSideMenu: true,
    messages: [
      {
        user: "Ishigami Senku",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis mi sem, sed ultricies purus."
      },
      {
        user: "Deku",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed fermentum felis, sed ullamcorper mauris. Sed turpis sapien, aliquet id eros in, malesuada laoreet lectus."
      }
    ]
  };

  toggleChat = () => {
    let stateCopy = { ...this.state };
    stateCopy.showDm = !this.state.showDm;
    this.setState(stateCopy);
  };

  toggleSideMenu = () => {
    let stateCopy = { ...this.state };
    stateCopy.showSideMenu = !this.state.showSideMenu;
    this.setState(stateCopy);
  };

  currentPagechecker = () => {
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
    if (this.state.messageToBeSent === "") {
    } else {
      socket.emit("chatMessage", {
        topic: this.currentPagechecker()[0].topic,
        message: this.state.messageToBeSent,
        user: "Asa"
      });
      this.clearMessage();
    }
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
    this.currentPagechecker();
    return (
      <Aux>
        <Navigation toggleSide={this.toggleSideMenu} />
        <main className={styles.MainContainer}>
          <SideMenu
            showSideMenu={this.state.showSideMenu}
            showDm={this.state.showDm}
            toggle={this.toggleChat}
            chats={this.state.chatrooms}
            onclick={this.pageChanger}
          />
          <ChatPage
            messageUpdate={e => this.messageToBeSentUpdater(e)}
            msgs={this.currentPagechecker()[0].messages}
            topic={this.currentPagechecker()[0].topic}
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
