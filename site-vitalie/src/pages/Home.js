import React from 'react'
import styles from "./home.module.css";
import paper from ".././imgs/paper.webp"

const Home = () => {

  return (
    <div>
        <div className={styles.paper}>
          <img src={paper} />
        </div>
        <div className={styles.divCabecalho}>
          <h1 className={styles.title}>Best way to find workers, Simple.</h1>
          <h3 className={styles.subtitle}>The New Way, The Best Way.</h3>

          <div className={styles.botoes}>
            <li className={styles.btnPostJob}><h3>Post a job</h3></li>
            <li className={styles.btnRegister}><h3>Register</h3></li>
          </div>

        </div>
        <div className={styles.divAboutUs}>
          <h1 className={styles.title}>Our Mission.</h1>
          <h3 className={styles.subtitleSemDots}>We help homeowners choose great builders, and we help great builders succeed</h3>
        </div>
    </div>
  )
}

export default Home