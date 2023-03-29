import React from "react";
import { Link } from 'react-router-dom';
import styles from "../css/comerciante.module.css";

const SendInvite = () => {
  return (
    <div className={styles.divTotal}>
      <h1>Vamos encontrar os melhores trabalhadores perto de você</h1>
      <Link to="/meustrabalhos/ElPy6DtdwtoY5stiMO01">
        <h3>Ver trabalho publicado</h3>
      </Link>
      <h4>Convida 5 trabalhadores para te darem um orçamento. É a melhor maneira para começar uma converça!</h4>
      <br></br>
      <h3>Trabalhadores recomendados:</h3>

    </div>
  );
};

export default SendInvite;
