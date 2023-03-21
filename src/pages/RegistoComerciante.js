import React from "react";
import { Link } from 'react-router-dom';
import styles from "../css/comerciante.module.css";

const RegistoComerciante = () => {
  return (
    <div className={styles.divTotal}>
      <h1>Seu próximo trabalho é apenas ao virar da esquina</h1>
      <p>
         Há muito trabalho local, mas encontrá-lo é mais fácil dizer do que fazer. No MyBuilder, você define uma área de trabalho personalizada para que cada lead recebido esteja exatamente onde deseja trabalhar.
      </p>
      <Link to="/aplicativo-de-comerciante">
        <button className={styles.registarBtn}>Registar</button>
      </Link>
    </div>
  );
};

export default RegistoComerciante;
