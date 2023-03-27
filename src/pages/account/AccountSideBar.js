import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../css/dashboard/sidebar.module.css";

const AccountSideBar = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith(
    "/minha-conta"
  );
  return (
    <>
      {isDashboardPage ? (
        <div className={styles.sidebar}>
          <ul>
            <li>
              <Link to="/minha-conta/detalhes-de-contacto">
                Detalhes de contacto
              </Link>
            </li>
            <li>
              <Link to="/minha-conta/perfil-de-trabalhador">Perfil de Trabalhador</Link>
            </li>
            <li>
              <Link to="/minha-conta/definições">Definições</Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default AccountSideBar;
