import React from "react";
import styles from "./ChatMessage.module.css";

const chatMessage = props => (
  <div className={styles.ChatMessage}>
    <img src="https://vignette.wikia.nocookie.net/dr-stone/images/8/8b/Senku_Ishigami_Portrait.png/revision/latest?cb=20190927164015" />
    <div className={styles.ChatMessageText}>
      <h1>Ishigami Senku</h1>
      <span>
        Hello this is a test message on the chat application I am creating.
      </span>
    </div>
  </div>
);

export default chatMessage;
