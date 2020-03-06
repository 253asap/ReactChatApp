import React from "react";
import styles from "./Navigation.module.css";
import LogoImg from "../../assets/chatLogo.png";

const Navigation = props => (
  <header className={styles.Navigation}>
    <nav>
      <ul>
        <li className={styles.Logo} onClick={props.toggleSide}>
          <img src={LogoImg} alt="Logo" key="logo" />
        </li>
      </ul>
      <ul>
        <li>
          <a href="/login">{props.auth ? "Logout" : "Login"}</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
