import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = UserAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update the window width when the component mounts
    setWindowWidth(window.innerWidth);

    // Add an event listener to update the window width when it changes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {windowWidth > 800 ?
        <nav>
          <div className={styles.logo}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3>meuJob</h3>
            </Link>
          </div>

          <ul>
            <Link to="/publicar-trabalho" style={{ textDecoration: "none" }}>
              <li className={styles.btnEntrar}>Criar Trabalho</li>
            </Link>
            {user && user.email ? (
              <>
                <Link to="/meustrabalhos" style={{ textDecoration: "none" }}>
                  <li className={styles.btnPostJob}>Meus trabalhos publicados</li>
                </Link>
                {user.trade_member == false ? (
                  <Link
                    to="/registrar-como-comerciante"
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnPostJob}>Tornar-se trabalhador</li>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard-de-trabalhos/trabalhos-proximos"
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnPostJob}>Dashboard de trabalhador</li>
                  </Link>
                )}

                <Link
                  to="/minha-conta/detalhes-de-contacto"
                  style={{ textDecoration: "none" }}
                >
                  <li className={styles.btnPostJob}>Minha Conta</li>
                </Link>
              </>
            ) : (
              <>
                <li className={styles.btnPostJob}>Homeowners</li>
                <Link
                  to="/registrar-como-comerciante"
                  style={{ textDecoration: "none" }}
                >
                  <li className={styles.btnPostJob}>Tornar-se trabalhador</li>
                </Link>
                <Link to="/entrar" style={{ textDecoration: "none" }}>
                  <li className={styles.btnEntrar}>Entrar</li>
                </Link>
              </>
            )}
          </ul>
        </nav>
        :
        <nav>
          <div className={styles.logo}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3>meuJob</h3>
            </Link>
          </div>
        </nav>
      }
    </>
  );
};

export default NavBar;
