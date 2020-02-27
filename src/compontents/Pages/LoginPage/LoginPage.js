import React, { useRef } from "react";
import styles from "./LoginPage.module.css";

const LoginPage = props => {
  const username = useRef(null);
  const password = useRef(null);
  props.socket.on("loginStatus", status => {
    if (status.success) {
      sessionStorage.setItem("name", status.user);
      sessionStorage.setItem("key", status.key);
      window.location.href = "/";
    } else {
      alert("invalid username or password");
    }
  });
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
        <button
          onClick={() =>
            props.login(username.current.value, password.current.value)
          }
        >
          Login
        </button>
        <a href="/register">
          No account? Click here to <span>register</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
