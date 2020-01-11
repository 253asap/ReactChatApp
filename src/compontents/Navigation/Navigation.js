import React from "react";
import styles from "./Navigation.module.css";
import LogoImg from "../../assets/chatLogo.png";

const Navigation = props => (
  <header className={styles.Navigation}>
    <nav>
      <ul>
        <li className={styles.Logo}>
          <img src={LogoImg} alt="Logo" />
        </li>
        <li>
          <span className={styles.Dropdown}>Chats</span>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
