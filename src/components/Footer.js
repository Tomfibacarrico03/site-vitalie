import React from 'react'
import styles from "../css/footer.module.css";

const Footer = () => {
  
  return (
   
    <footer className={styles.Footer}>
        <h4>© Copyright 2023</h4>
        <div>
          <a href='https://www.livroreclamacoes.pt/Inicio/'>Livro de reclamações</a>
          <p>Vitalie Puscas</p>
          <p>517635763</p>
          <p></p>
        </div>
    </footer>
  )
}

export default Footer