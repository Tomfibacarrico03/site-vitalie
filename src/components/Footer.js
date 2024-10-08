import React from "react";
import styles from "../css/footer.module.css";
import { Link } from "react-router-dom";

import insta from "../imgs/insta.png";
import face from "../imgs/facebook.png";

const Footer = () => {
  // Function to generate WhatsApp link
  const getWhatsAppLink = (phoneNumber, message = "") => {
    const formattedNumber = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const encodedMessage = encodeURIComponent(message); // Encode message for URL
    return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  };

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
              href="/Termos gerais, Politica privacidade e cookies.pdf"
              className={styles.footerBelow_header_a}
              target="_blank"
              rel="noopener noreferrer"
            >
              Termos e Condições
            </a>
            <a
              href="/Termos gerais, Politica privacidade e cookies.pdf"
              className={styles.footerBelow_header_a}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Política de Privacidade
            </a>
            <a
              href="/informaçao RAL.pdf"
              className={styles.footerBelow_header_a}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Resolução alternativa de litigíos de consumo
            </a>
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              className={styles.footerBelow_header_a}
            >
              Livro de Reclamações
            </a>
            <a className={styles.footerBelow_header_a}>
              © Copyright 2023 meuJob
            </a>
          </div>
          <div>
            <h1 className={styles.footerBelow_header_h1}>Contactos</h1>
            <a className={styles.footerBelow_header_a}>Vitalie Puscas</a>
            <a className={styles.footerBelow_header_a}>meujob.pt@hotmail.com</a>

            {/* WhatsApp link implementation */}
            <a
              href={getWhatsAppLink(
                "+44 7478 825246",
                "Boa tarde, tenho uma questão:"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerBelow_header_a}
            >
              +44 7478 825246
            </a>

            <a className={styles.footerBelow_header_a}>NIF: 517635763</a>
            <p
              className={styles.footerBelow_header_a}
              style={{ color: "white", marginLeft: -5 }}
            >
              Rua São Sebastião, nº 66, 8500-617 Portimão
            </p>
            <br></br>
            <div className={styles.redes}>
              <a
                href="https://www.instagram.com/meujob.pt/"
                target="_blank"
                className={styles.footerBelow_header_a}
              >
                <img src={insta} alt="Instagram" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100094885226816"
                target="_blank"
                className={styles.footerBelow_header_a}
              >
                <img src={face} alt="Facebook" />
              </a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Footer;
