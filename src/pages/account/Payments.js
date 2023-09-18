import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import styles from "../../css/dashboard/sidebar.module.css";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "../../firebase";

const Payments = () => {
    const requestCIT = httpsCallable(functions, "requestCIT");

  return (
    <>
      <b>Pagamentos</b>
      <button onClick={requestCIT}>requestCIT</button>
    </>
  );
};

export default Payments;
