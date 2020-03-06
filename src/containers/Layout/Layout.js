import React, { Component, useState } from "react";
import Aux from "../../hoc/Auxx";
import Navigation from "../../compontents/Navigation/Navigation";
import styles from "./Layout.module.css";
import ChatPage from "../../compontents/Pages/ChatPage/ChatPage";
import SideMenu from "../../compontents/SideMenu/SideMenu";

class Layout extends Component {
  state = {
    messageToBeSent: "",
    chatrooms: this.props.chatrooms,
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
    ],
    authenticated: true
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
      this.props.sendMsg(
        this.state.messageToBeSent,
        this.currentPagechecker()[0].topic,
        this.props.user.name,
        parseInt(this.props.user.key)
      );
      this.clearMessage();
    }
  };

  render() {
    this.props.updateUser();
    this.currentPagechecker();
    return (
      <Aux>
        <Navigation
          auth={this.state.authenticated}
          toggleSide={this.toggleSideMenu}
        />
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
