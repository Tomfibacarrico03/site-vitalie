import React from 'react'
import styles from "../css/footer.module.css";

const Footer = () => {
  
  return (
   
    <div className={styles.footer}>
      <div className={styles.footerBelow}>
        <header>
        <div>
          <h1>Websites</h1>
          <a href="#how_we_work" id="opcao">SaaS</a>
          <a>Informative</a>
          <a>Social Media</a>
        </div>
        <div>
          <h1>Apps</h1>
          <a>Social Media</a>
          <a>Integration with SaaS</a>
        </div>
        <div>
          <h1>Single Services</h1>
          <a>Soundtracks</a>
        </div>
        <div>
          <h1>Single Services</h1>
          <a>Soundtracks</a>
        </div>
        </header>
      </div>
    </div>
  )
}

export default Footer