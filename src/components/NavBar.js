import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = UserAuth();
  return (
    <nav>
      <div className={styles.logo}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3>Logotipo</h3>
      </Link>
      </div>
     
      <ul>
        <Link to="/postJob" style={{ textDecoration: "none" }}>
          <li className={styles.btnPostJob}>Criar Trabalho</li>
        </Link>
        {user && user.email ? (
          <>
            <Link to="/meustrabalhos" style={{ textDecoration: "none" }}>
              <li className={styles.btnPostJob}>Meus trabalhos publicados</li>
            </Link>
            <Link to="/meustrabalhos" style={{ textDecoration: "none" }}>
              <li className={styles.btnPostJob}>Ajuda</li>
            </Link>
            <Link to="/minha-conta" style={{ textDecoration: "none" }}>
              <li className={styles.btnPostJob}>Minha Conta</li>
            </Link>
          </>
        ) : (
          <>
            <li>Homeowners</li>
            <Link
              to="/registrar-como-comerciante"
              style={{ textDecoration: "none" }}
            >
              <li className={styles.btnPostJob}>Tornar-se trabalhador</li>
            </Link>
            <Link to="/entrar" style={{ textDecoration: "none" }}>
              <li className={styles.btnPostJob}>Entrar</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
