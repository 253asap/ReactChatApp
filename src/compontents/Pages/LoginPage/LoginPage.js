import React from "react";
import styles from "./LoginPage.module.css";

const LoginPage = props => (
  <div className={styles.Back}>
    <div className={styles.LoginBox}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username..." />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="text" placeholder="Enter Password..." />
      </div>
      <button>Login</button>
      <a href="/register">
        No account? Click here to <span>register</span>
      </a>
    </div>
  </div>
);

export default LoginPage;
