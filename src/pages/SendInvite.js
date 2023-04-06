import React from "react";
import { Link, useLocation } from 'react-router-dom';
import styles from "../css/comerciante.module.css";

const SendInvite = () => {

  const location = useLocation();
  const job = location.state;
  return (
    <div className={styles.divTotal}>
      <h1>Vamos encontrar os melhores trabalhadores perto de você</h1>
      <p>Convida 5 trabalhadores para te darem um orçamento. É a melhor maneira para começar uma converça!</p>
      
      <Link to={`/meustrabalhos/${job.id}`}>
        <button className={styles.btnVer}>Ver trabalho publicado</button>
      </Link>
      <br></br>
      <br></br>
      <h3>Trabalhadores recomendados</h3>

    </div>
  );
};

export default SendInvite;
