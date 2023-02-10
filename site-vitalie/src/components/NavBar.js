import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <nav>
      <div className={styles.logo}>
        <h3>Logotipo</h3>
      </div>
      <ul>
        <Link to="/postJob" style={{textDecoration: "none"}}>
          <li className={styles.btnPostJob} href="/postJob">
            Post a job
          </li>
        </Link>
        <li>Homeowners</li>
        <li>Register</li>
      </ul>
    </nav>
  );
};

export default NavBar;
