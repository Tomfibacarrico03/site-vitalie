import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/home.module.css";
import workers from ".././imgs/workers.jpg";
import handshake from ".././imgs/handshake.png";


const Home = () => {
  
  return (
    <div>
      {/* <div className={styles.paper}>
        <img src={paper} />
      </div> */}
      <div className={styles.divCabecalho}>
        <div>
          <h1 className={styles.title}>A melhor forma de encontrar trabalhadores, Simples.</h1>
          <h3 className={styles.subtitle}>Ajudamos donos de casas a encontrar o trabalhador ideal, e bons trabalhadores a ter sucesso.</h3>

          <div className={styles.botoes}>
          <Link to="/registrar-como-comerciante" style={{ textDecoration: "none", zIndex: 120 }}>
            <li className={styles.btnRegister}>
              <h3>Registar como Trabalhador</h3>
            </li>
            </Link>
            <Link to="/publicar-trabalho" style={{ textDecoration: "none", zIndex: 120 }}>
              <li className={styles.btnPostJob}>
                <h3>Criar Trabalho</h3>
              </li>
            </Link>   
          </div>
        </div>
        <div className={styles.workers_side}>
          {/* <img src={workers} /> */}
        </div>
        <div className={styles.backGroundTheme}>
          {/* <img src={workers} /> */}
          TESTE
        </div>
      </div>
      <div className={styles.zonaComecar}>
        <h1 className={styles.titles}>Como posso começar?</h1>
        <div className={styles.divAboutUs}>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>1</h1>
            <h1>Publica o teu trabalho</h1>
            <p>Tell us about your job, and we'll alert suitable tradespeople in your area. It’s simple and free.</p>
          </div>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>2</h1>
            <h1>Descreve o teu trabalho</h1>
            <p>Tell us about your job, and we'll alert suitable tradespeople in your area. It’s simple and free.</p>
          </div>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>3</h1>
            <h1>Faz um revisão e escolhe</h1>
            <p>Tell us about your job, and we'll alert suitable tradespeople in your area. It’s simple and free.</p>
          </div>
        </div>
        <div className={styles.verComoFuncionaBtn}>
          <button>Ver como funciona</button>
        </div>
      </div>
      <div className={styles.divCabecalho2}>
        <div>
          <h1 className={styles.title}>Vamos espreitar?</h1>
          <h3 className={[styles.subtitle]}>Ajudamos donos de casas a encontrar o trabalhador ideal, e bons trabalhadores a ter sucesso.</h3>

          <div>
            <Link to="/registrar-como-comerciante" style={{ textDecoration: "none", zIndex: 120 }}>
              <li className={styles.btnApply}>
                <h3>Juntar-me agora</h3>
              </li>
            </Link>   
          </div>
        </div>
        <div className={styles.workers_side2}>
          {/* <img src={workers} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
