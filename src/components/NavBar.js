import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { UserAuth } from "../context/AuthContext";
import Hamburger from "hamburger-react";
import logoa from "../imgs/logonovonew.png";

const NavBar = () => {
  const { user } = UserAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    // Update the window width when the component mounts
    setWindowWidth(window.innerWidth);

    // Add an event listener to update the window width when it changes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const closeMobileMenu = () => {
    setOpen(false);
  };
  return (
    <>
      {windowWidth > 900 ? (
        <nav>
          <div className={styles.logo}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                style={{
                  width: 201,
                  height: 43,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
                src={logoa}
              />
            </Link>
          </div>

          <ul>
            <Link to="/publicar-trabalho" style={{ textDecoration: "none" }}>
              <li className={styles.btnEntrar}>Criar Trabalho</li>
            </Link>
            {user && user.email ? (
              <>
                <Link to="/meustrabalhos" style={{ textDecoration: "none" }}>
                  <li className={styles.btnPostJob}>
                    Meus trabalhos publicados
                  </li>
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
                    <li className={styles.btnPostJob}>
                      Dashboard de trabalhador
                    </li>
                  </Link>
                )}

                <Link
                  to="/minha-conta/detalhes-de-contacto"
                  style={{ textDecoration: "none" }}
                >
                  <li className={styles.btnPostJob}>Minha Conta</li>
                </Link>
                {user.trade_member == true && (
                  <Link
                    to="/minha-conta/creditos"
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnPostJob}>
                      {" "}
                      {user.credits ? user.credits + " créditos" : "0 créditos"}
                    </li>
                  </Link>
                )}
              </>
            ) : (
              <>
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
      ) : (
        <>
          <nav>
            <div className={styles.logo}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img
                  style={{
                    width: 201,
                    height: 43,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                  src={logoa}
                />
              </Link>
            </div>
            <div className={styles.HamMenu}>
              <Hamburger
                rounded
                distance="sm"
                toggled={isOpen}
                toggle={setOpen}
                size={25}
                direction="right"
                color="#ffff"
              />
            </div>
          </nav>
          <div
            className={styles.navOpen}
            style={isOpen ? { height: "100vh" } : { height: "0vh" }}
          >
            <ul>
              <Link
                to="/publicar-trabalho"
                onClick={closeMobileMenu}
                style={{ textDecoration: "none" }}
              >
                <li className={styles.btnEntrar}>Criar Trabalho</li>
              </Link>
              {user && user.email ? (
                <>
                  <Link
                    to="/meustrabalhos"
                    onClick={closeMobileMenu}
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnPostJob}>
                      Meus trabalhos publicados
                    </li>
                  </Link>
                  {user.trade_member == false ? (
                    <Link
                      onClick={closeMobileMenu}
                      to="/registrar-como-comerciante"
                      style={{ textDecoration: "none" }}
                    >
                      <li className={styles.btnPostJob}>
                        Tornar-se trabalhador
                      </li>
                    </Link>
                  ) : (
                    <Link
                      onClick={closeMobileMenu}
                      to="/dashboard-de-trabalhos/trabalhos-proximos"
                      style={{ textDecoration: "none" }}
                    >
                      <li className={styles.btnPostJob}>
                        Dashboard de trabalhador
                      </li>
                    </Link>
                  )}

                  <Link
                    onClick={closeMobileMenu}
                    to="/minha-conta/detalhes-de-contacto"
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnPostJob}>Minha Conta</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={closeMobileMenu}
                    to="/registrar-como-comerciante"
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnPostJob}>Tornar-se trabalhador</li>
                  </Link>
                  <Link
                    onClick={closeMobileMenu}
                    to="/entrar"
                    style={{ textDecoration: "none" }}
                  >
                    <li className={styles.btnEntrar}>Entrar</li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
