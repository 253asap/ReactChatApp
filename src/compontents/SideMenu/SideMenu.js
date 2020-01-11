import React from "react";
import styles from "./SideMenu.module.css";
import SideMenuItem from "./SideMenuItem/SideMenuItem";

const sideMenu = props => (
  <div className={styles.SideMenu}>
    <SideMenuItem />
  </div>
);

export default sideMenu;
