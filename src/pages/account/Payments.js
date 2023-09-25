import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import styles from "../../css/navbar.module.css";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "../../firebase";

const Payments = () => {
  const requestCIT = httpsCallable(functions, "requestCIT");
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
    const url = `https://us-central1-site-vitalie.cloudfunctions.net/requestCIT?userId=${user.uid}`;

    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        const responseData = JSON.parse(res.data.result)
        console.log("Successful Response", responseData);
        console.log("(Temp)transactionID: " + responseData.transactionID);
        setSpgContext(responseData.formContext);
        setTransactionID(responseData.transactionID);
        setSpgSignature(responseData.transactionSignature);
        setSpgConfig({
          paymentMethodList: [],
          amount: { value: responseData.amount.value, currency: responseData.amount.currency },
          language: "pt",
          redirectUrl: "http://localhost:3000/user/pagamentos",
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
    console.log("Spg Config: "+JSON.stringify(  spgConfig));
    console.log("Spg Style: "+JSON.stringify(spgStyle));
    console.log("Spg context; "+ spgContext);
  }, [transactionID]);

  return (
    <>
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
    </>
  );
};

export default Payments;
