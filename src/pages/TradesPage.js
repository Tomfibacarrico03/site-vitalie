import React from "react";
import { Link } from 'react-router-dom';
import styles from "../css/comerciante.module.css";

const TradesPage = () => {
  return (
    <div>
    <div className={styles.divCabecalho}>
        <div className={styles.workers_side}>
          {/* <img src={workers} /> */}
        </div>
        <div>
          <h1 className={styles.title}>Seu próximo trabalho é apenas ao virar da esquina</h1>
          <h3 className={styles.subtitle}> Há muito trabalho local, mas encontrá-lo é mais fácil dizer do que fazer. No MyBuilder, você define uma área de trabalho personalizada para que cada lead recebido esteja exatamente onde deseja trabalhar.</h3>

          <div>
          <Link to="/aplicativo-de-comerciante" style={{ textDecoration: "none", zIndex: 120 }}>
            <li className={styles.btnRegister}>
              <h3>Registar agora</h3>
            </li>
          </Link>
          </div>
        </div>
        
      </div>
      <div className={styles.zonaComecar}>
        <h1 className={styles.titles}>Pay as you go simplicity</h1>
        <div className={styles.divAboutUs}>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>1</h1>
            <h1>Pick the jobs you want</h1>
            <p>We’ll only send you leads where you want them. You choose which leads you’re interested in.</p>
          </div>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>2</h1>
            <h1>Homeowners shortlist</h1>
            <p>Homeowners make their choice based on the profiles and feedback of interested trades.</p>
          </div>
          <div>
            <h1 style={{color: "rgba(0, 0, 0, 0.2)"}}>3</h1>
            <h1>Call to arrange a quote</h1>
            <p>Once shortlisted, we’ll charge a small fee and put you in touch with the homeowner.</p>
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
