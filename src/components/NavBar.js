import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {

  const { user } = UserAuth();
  return (
    <nav>
      <div className={styles.logo}>
        <h3>Logotipo</h3>
      </div>
      <ul>
        <Link to="/postJob" style={{textDecoration: "none"}}>
          <li className={styles.btnPostJob}>
            Post a job
          </li>
        </Link>
        <li>Homeowners</li>
        {user && user.email ? (
          <Link to="/minha-conta" style={{ textDecoration: "none" }}>
            <li className={styles.btnPostJob}>Minha Conta</li>
          </Link>
        ) : (
          <Link to="/registrar-como-comerciante" style={{ textDecoration: "none" }}>
            <li className={styles.btnPostJob}>Registar</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
