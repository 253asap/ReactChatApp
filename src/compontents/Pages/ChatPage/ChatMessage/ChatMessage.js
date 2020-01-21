import React from "react";
import styles from "./ChatMessage.module.css";

const chatMessage = props => (
  <div className={styles.ChatMessage}>
    <img
      src="https://vignette.wikia.nocookie.net/dr-stone/images/8/8b/Senku_Ishigami_Portrait.png/revision/latest?cb=20190927164015"
      alt=""
    />
    <div className={styles.ChatMessageText}>
      <h1>{props.user}</h1>
      <span>{props.msg}</span>
    </div>
  </div>
);

export default chatMessage;
