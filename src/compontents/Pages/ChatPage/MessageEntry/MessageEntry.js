import React from "react";
import styles from "./MessageEntry.module.css";
import Aux from "../../../../hoc/Auxx";

const messageEnty = props => (
  <Aux>
    <div className={styles.EntryArea}>
      <textarea className={styles.MessageEntry} />
      <button className={styles.Button}>Send</button>
    </div>
  </Aux>
);

export default messageEnty;
