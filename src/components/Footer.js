import React from "react";
import styles from "../css/footer.module.css";
import { Link } from "react-router-dom";

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
            <Link
              to="aplicativo-de-comerciante"
              style={{ textDecoration: "none" }}
            >
              <a className={styles.footerBelow_header_a}>Registe-se</a>
            </Link>
          </div>
          <div>
            <h1 className={styles.footerBelow_header_h1}>Empresa</h1>
            <a
              href="/termos.pdf"
              className={styles.footerBelow_header_a}
              target="_blank"
              rel="noopener noreferrer"
            >
              Termos e Condições
            </a>
            <a className={styles.footerBelow_header_a}>
              Política de Privacidade
            </a>
            <a className={styles.footerBelow_header_a}>Livro de Reclamações</a>
            <a className={styles.footerBelow_header_a}>
              © Copyright 2023 meuJob
            </a>
          </div>
          <div>
            <h1 className={styles.footerBelow_header_h1}>Contactos</h1>
            <a className={styles.footerBelow_header_a}>Vitalie Puscas</a>
            <a className={styles.footerBelow_header_a}>
              vitaliepuscas@outlook.com
            </a>
            <a className={styles.footerBelow_header_a}>+44 7478 825246</a>
            <a className={styles.footerBelow_header_a}>NIF: 517635763</a>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Footer;
