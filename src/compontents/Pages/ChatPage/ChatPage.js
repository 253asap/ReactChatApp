import React from "react";
import styles from "./ChatPage.module.css";
import ChatrooomName from "../ChatPage/ChatroomName/ChatroomName";
import MessageEntry from "../ChatPage/MessageEntry/MessageEntry";
import ChatMessage from "../ChatPage/ChatMessage/ChatMessage";

const chatPage = props => (
  <div className={styles.ChatPage}>
    <ChatrooomName />
    <div className={styles.Chat}>
      <ChatMessage />
    </div>
    <MessageEntry />
  </div>
);

export default chatPage;
