import React, { Component } from "react";
import Aux from "../../hoc/Auxx";
import Navigation from "../../compontents/Navigation/Navigation";
import styles from "./Layout.module.css";
import ChatPage from "../../compontents/Pages/ChatPage/ChatPage";
import SideMenu from "../../compontents/SideMenu/SideMenu";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Navigation />
        <main className={styles.MainContainer}>
          <SideMenu />
          <ChatPage />
        </main>
      </Aux>
    );
  }
}

export default Layout;
