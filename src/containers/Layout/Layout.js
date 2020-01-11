import React, { Component } from "react";
import Aux from "../../hoc/Auxx";
import Navigation from "../../compontents/Navigation/Navigation";
import styles from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Navigation />
        <main className={styles.MainContainer}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
