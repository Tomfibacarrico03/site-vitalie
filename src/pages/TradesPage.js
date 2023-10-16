import React from "react";
import { Link } from 'react-router-dom';
import workers from ".././imgs/workers.jpg";
import styles from "../css/home.module.css";

const TradesPage = () => {
  return (
    <div>
    <div className={styles.divCabecalho}>
        <div className={styles.workers_side}>
          {/* <img src={workers} /> */}
        </div>
     
        <div>
          <h1 className={styles.title}>A melhor forma de encontrar trabalhadores, Simples.</h1>
          <h3 className={styles.subtitle}>Ajudamos donos de casas a encontrar o trabalhador ideal, e bons trabalhadores a ter sucesso.</h3>

          <div className={styles.botoes}>
          <Link to="/aplicativo-de-comerciante" style={{ textDecoration: "none", zIndex: 120 }}>
            <li className={styles.btnApply}>
              <h3>Registar agora</h3>
            </li>
            </Link>
             
          </div>
        </div>
        <div className={styles.workers_side}>
          <img className={styles.imgWorkers} src={workers} />
        </div>
        
      </div>
      <div className={styles.zonaComecar}>
        <h1 className={styles.titles}>Simples pagamento durante o uso</h1>
        <div className={styles.divAboutUs}>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>1</h1>
            <h1>Escolhe os teus trabalhos</h1>
            <p>Enviaremos leads apenas para onde você quiser. Escolhe em quais leads está interessado.</p>
          </div>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>2</h1>
            <h1>Lista Restrita</h1>
            <p>Os proprietários fazem sua escolha com base nos perfis e feedback dos negócios interessados.</p>
          </div>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>3</h1>
            <h1>Liga para negociar</h1>
            <p>Depois de selecionados, cobraremos uma pequena taxa e colocaremos você em contato com o proprietário.</p>
          </div>
        </div>
        <div className={styles.verComoFuncionaBtn}>
          <h1>The most cost effective way to win work</h1>
          <p>With MyBuilder it's free to send an introduction message to a homeowner. You only pay a fee when the homeowner shortlists you and verified contact details are exchanged. Our shortlist fees typically range from £2 to £35 depending on the size of the job. There are no joining fees or membership fees and no hidden costs.</p>
        </div>
      </div>
    </div>
  );
};

export default TradesPage;
