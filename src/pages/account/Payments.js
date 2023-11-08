import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "../../firebase";
import {
  serverTimestamp,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  collection,
} from "firebase/firestore";
import styles from "../../css/minhaconta.module.css";

const Payments = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const { user } = UserAuth();
  const [spgContext, setSpgContext] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [spgSignature, setSpgSignature] = useState("");
  const [spgConfig, setSpgConfig] = useState({});

  const spgStyle = {
    layout: "default",
    theme: "--light",
    color: {
      primary: "",
      secondary: "",
      border: "",
      surface: "",
      header: {
        text: "",
        background: "white",
      },
      body: {
        text: "",
        background: "white",
      },
    },
    font: "Roboto",
  };

  const requestForm = () => {
    console.log("in RequestForm");
    const url = `https://us-central1-site-vitalie.cloudfunctions.net/requestCIT?userId=${user.uid}`;

    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        const responseData = JSON.parse(res.data.result)
        setSpgContext(responseData.formContext);
        setTransactionID(responseData.transactionID);
        setSpgSignature(responseData.transactionSignature);
        setSpgConfig({
          paymentMethodList: [],
          amount: { value: responseData.amount.value, currency: responseData.amount.currency },
          language: "pt",
          redirectUrl: "http://localhost:3000/minha-conta/pagamentos",
          customerData: null,
        })
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    if (transactionID) {
      const script = document.createElement("script");
      script.src = `https://spg.qly.site1.sibs.pt/assets/js/widget.js?id=${transactionID}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [transactionID]);

  useEffect(() => {
    const paymentId = searchParams.get('id');
    async function checkAndSavePayment() {
      if (paymentId) {
        console.log("paymentId: " + paymentId);
        const url = `https://us-central1-site-vitalie.cloudfunctions.net/statusTransaction?userId=${user.uid}&transactionId=${paymentId}`;
        
        fetch(url)
        .then((response) => response.json())
        .then((res) => {
          const responseData = JSON.parse(res)
          console.log(responseData);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
      }
    }

    if (user.uid !== undefined){
      checkAndSavePayment();
    }
  }, [searchParams]);

  return (
    <div className={styles.detalhesContainer}>
      {spgContext ? (
        <>
          <form
            className="paymentSPG"
            spg-signature={spgSignature}
            spg-context={spgContext}
            spg-config={JSON.stringify(spgConfig)}
            spg-style={JSON.stringify(spgStyle)}
          ></form>
        </>
      ) : null}
      <b>Pagamentos</b>

      <button className={styles.btnPostJob} onClick={requestForm}>
        Adicionar Cartão
      </button>
      <div>paymentId: {searchParams.get('id')}</div>
    </div>
  );
};

export default Payments;
