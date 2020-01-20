import React from "react";
import styles from "./SideMenu.module.css";
import SideMenuItem from "./SideMenuItem/SideMenuItem";

const sideMenu = props => {
  const active = { backgroundColor: "rgb(102, 102, 102)" };
  return (
    <div className={styles.SideMenu}>
      <div className={styles.Sections}>
        <span style={props.showDm ? null : active} onClick={props.toggle}>
          Chats
        </span>
        <span style={!props.showDm ? null : active} onClick={props.toggle}>
          DM's
        </span>
      </div>
      <SideMenuItem />
    </div>
  );
};
export default sideMenu;
