import React, { useRef } from "react";
import styles from "../LoginPage/LoginPage.module.css";

const RegisterPage = props => {
  const username = useRef(null);
  const password = useRef(null);
  return (
    <div className={styles.Back}>
      <div className={styles.LoginBox}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username..."
            ref={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Enter Password..."
            ref={password}
          />
        </div>
        <button onClick={props.register(username, password)}>Register</button>
        <a href="/login">
          Already have an account? Click here to <span>login</span>
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
