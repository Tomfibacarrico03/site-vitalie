import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../css/dashboard/sidebar.module.css";

const SideBar = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith(
    "/dashboard-de-trabalhos"
  );
  return (
    <>
      {isDashboardPage ? (
        <div className={styles.sidebar}>
          <ul>
            <li>
              <Link to="/dashboard-de-trabalhos/trabalhos-proximos">
                Trabalhos Próximos
              </Link>
            </li>
            <li>
              <Link to="/dashboard-de-trabalhos/interessado">Interessado</Link>
            </li>
            <li>
              <Link to="/dashboard-de-trabalhos/mensagens">Lista Restrita</Link>
            </li>
            <li>
              <Link to="/dashboard-de-trabalhos/mensagens">Trabalhos conseguidos</Link>
            </li>
            <li>
              <Link to="/dashboard-de-trabalhos/mensagens">Mensagens</Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default SideBar;
