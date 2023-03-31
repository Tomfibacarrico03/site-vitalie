import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "../css/home.module.css";
import paper from ".././imgs/paper.webp";
import { UserAuth } from '../context/AuthContext'

const Home = () => {
  const {user} = UserAuth()
  console.log(user)
  
  return (
    <div>
      <div className={styles.paper}>
        <img src={paper} />
      </div>
      <div className={styles.divCabecalho}>
        <h1 className={styles.title}>A melhor forma de encontrar trabalhadores, Simples.</h1>
        <h3 className={styles.subtitle}>Uma nova forma, a melhor forma.</h3>

        <div className={styles.botoes}>
          <Link to="/publicar-trabalho" style={{ textDecoration: "none", zIndex: 120 }}>
            <li className={styles.btnPostJob}>
              <h3>Criar Trabalho</h3>
            </li>
          </Link>   
          <Link to="/registrar-como-comerciante" style={{ textDecoration: "none", zIndex: 120 }}>
          <li className={styles.btnRegister}>
            <h3>Registar como Trabalhador</h3>
          </li>
          </Link>
        </div>
      </div>
      <div className={styles.divAboutUs}>
        <h1 className={styles.title}>A nossa missão.</h1>
        <h3 className={styles.subtitleSemDots}>
          Ajudamos donos de casas a encontrar o trabalhador ideal, e bons trabalhadores a ter sucesso.
        </h3>
      </div>
    </div>
  );
};

export default Home;
