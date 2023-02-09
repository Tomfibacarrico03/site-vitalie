import React from 'react'
import {Link} from 'react-router-dom'
import styles from "./navbar.module.css";

const NavBar = () => {
  

  return (
   
    <nav>
      <div className={styles.logo}><h3>Logotipo</h3></div>
      <ul>
        <li className={styles.btnPostJob}>Post a job</li>
        <li>Homeowners</li>
        <li>Register</li>
      </ul>
    </nav>
  )
}

export default NavBar