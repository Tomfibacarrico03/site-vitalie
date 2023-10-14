import React from 'react'
import styles from "../css/footer.module.css";

const Footer = () => {
  
  return (
   
    <div className={styles.footer}>
      <div className={styles.footerBelow}>
        <header className={styles.footerBelow_header}>
        <div>
          <h1 className={styles.footerBelow_header_h1}>Moradores</h1>
          <a className={styles.footerBelow_header_a}>Publicar Trabalho</a>
        </div>
        <div>
          <h1 className={styles.footerBelow_header_h1}>Trabalhadores</h1>
          <a className={styles.footerBelow_header_a}>Registe-se</a>
        </div>
        <div>
          <h1 className={styles.footerBelow_header_h1}>Empresa</h1>
          <a className={styles.footerBelow_header_a}>Termos e Condições</a>
          <a className={styles.footerBelow_header_a}>Política de Privacidade</a>
          <a className={styles.footerBelow_header_a}>Livro de Reclamações</a>
          <a className={styles.footerBelow_header_a}>© Copyright 2023 meuJob</a>
        </div>
        <div>
          <h1 className={styles.footerBelow_header_h1}>Contactos</h1>
          <a className={styles.footerBelow_header_a}>Vitalie Puscas</a>
          <a className={styles.footerBelow_header_a}>email</a>
          <a className={styles.footerBelow_header_a}>517635763</a>
        </div>
        </header>
      </div>
    </div>
  )
}

export default Footer