import React from "react";
import styles from "../LoginPage/LoginPage.module.css";

const RegisterPage = props => (
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
      <button>Register</button>
      <a href="/login">
        Already have an account? Click here to <span>login</span>
      </a>
    </div>
  </div>
);

export default RegisterPage;
