import React from "react";
import styles from "./SideMenuItem.module.css";

const sideMenuItem = props => (
  <div className={styles.SideMenuItem} onClick={props.click}>
    <img
      src="https://vignette.wikia.nocookie.net/dr-stone/images/8/8b/Senku_Ishigami_Portrait.png/revision/latest?cb=20190927164015"
      alt={`${props.topic}`}
    />
    <div className={styles.SideMenuItemText}>
      <span>{props.topic}</span>
      <p>Hey man I have the diagram for...</p>
    </div>
  </div>
);

export default sideMenuItem;
