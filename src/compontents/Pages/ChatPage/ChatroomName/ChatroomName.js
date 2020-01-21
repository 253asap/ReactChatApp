import React from "react";
import styles from "./ChatroomName.module.css";

const chatroomName = props => (
  <div className={styles.ChatroomName}>
    <img
      src="https://vignette.wikia.nocookie.net/bokunoheroacademia/images/6/66/Izuku_Midoriya_headshot.png/revision/latest?cb=20170928002152"
      alt="topic"
    />
    <span>{props.topic}</span>
  </div>
);

export default chatroomName;
