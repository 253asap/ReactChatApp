import React from "react";
import styles from "./ChatPage.module.css";
import ChatrooomName from "../ChatPage/ChatroomName/ChatroomName";
import MessageEntry from "../ChatPage/MessageEntry/MessageEntry";
import ChatMessage from "../ChatPage/ChatMessage/ChatMessage";

const chatPage = props => {
  let messages = props.msgs.map(msg => {
    return <ChatMessage user={msg.user} msg={msg.message} />;
  });
  return (
    <div className={styles.ChatPage}>
      <ChatrooomName topic={props.topic} />
      <div className={styles.Chat}>{messages}</div>
      <MessageEntry
        messageUpdate={props.messageUpdate}
        send={props.send}
        sendEnter={props.sendEnter}
      />
    </div>
  );
};

export default chatPage;
