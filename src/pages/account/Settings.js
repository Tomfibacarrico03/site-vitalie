import React from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from "../../css/minhaconta.module.css";

const Settings = () => {

  const navigate = useNavigate()

  const {logout} = UserAuth()

  const handleLogout = async () => {
    try {
      await logout();
      alert("Sessão Terminada")
      navigate('/')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.detalhesContainer}>
        <h1>Definições</h1>
        <button className={styles.terminarSessao} onClick={handleLogout}>
            Terminar Sessão
        </button>
      
    </div>
  );
};

export default Settings;
