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
  const [payments, setPayments] = useState([]);

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

  const fetchPayments = async () => {
    if (user) {
      try {
        const paymentsRef = collection(db, "payments");
        const q = query(paymentsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const paymentsData = [];
        querySnapshot.forEach((doc) => {
          paymentsData.push({ id: doc.id, ...doc.data() });
        });

        setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }
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
          .then((response) => null)
          .then((res) => {
            fetchPayments();
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    }

    if (user.uid !== undefined) {
      checkAndSavePayment();
    }
  }, [searchParams]);

  const servicesData = {
    "Serviços de Arquitetura": {
      "Conceitos fundamentais de design (para gerar orçamentos e apresentar pedidos de planejamento)": 8.00,
      "Plantas detalhadas em conformidade (para construtores e regulamentos de construção)": 8.00,
      "Cálculos de estrutura de construção": 8.00,
    },
    "Instalação de Banheiros": {
      "Renovação / instalação de banheiro": 6.00,
      "Instalar ou substituir um dispositivo": 5.00,
      "Reparar": 5.00,
      "Azulejos": 6.00,
    },
    "Alvenaria & Rejuntamento": {
      "Construindo uma parede": 5.00,
      "Construção de uma estrutura": 5.00,
      "Trabalho de alvenaria personalizado": 5.00,
      "Alterações na parede": 5.00,
      "Reapontamento": 5.00,
      "Trabalho na chaminé": 4.00,
      "Reparos": 5.00,
    },
    "Carpintaria & Marcenaria": {
      "Portas, janelas e pisos": 6.00,
      "Fabricação, montagem e reparos de móveis": 5.00,
      "Unidades de cozinha e bancadas": 6.00,
      "Área coberta": 5.00,
    },
    "Carpetes, Lino & Pisos": {
      "Piso novo ou substituição": 5.00,
      "Lixamento / restauração": 5.00,
      "Reparo / ajuste": 5.00,
    },
    "Aquecimento Central": {
      "Caldeira": 6.00,
      "Tubulação / fornecimento": 6.00,
      "Radiadores": 6.00,
      "Termostato": 6.00,
      "Aquecimento de piso": 6.00,
      "Instalação completa do sistema": 7.00,
    },
    "Chaminé & Lareira": {
      "Chaminé": 5.00,
      "Lareira": 5.00,
    },
    "Conversões": {
      "Conversão de sotão": 5.00,
      "Conversão de um espaço existente": 6.00,
      "Alteração de paredes": 5.00,
      "Restaurar ou melhorar um espaço existente": 5.00,
    },
    "Prova de Humidade": {
      "Não - Preciso de ajuda para investigar": 6.00,
      "Sim - Preciso apenas de ajuda para resolver o problema": 6.00,
    },
    "Demolição & Limpeza": {
      "Remoção de lixo apenas": 5.00,
      "Demolição de edifícios / estruturas": 8.00,
      "Derrubar uma parede": 5.00,
    },
    "Entradas & Paving": {
      "Instalar / Reparar uma entrada": 5.00,
      "Limpar ou selar uma entrada": 5.00,
      "Kerb suspenso (crossover)": 5.00,
      "Pavimentação, pátios e caminhos": 5.00,
    },
    "Elétrica": {
      "Refazer circuitos": 6.00,
      "Caixas de fusíveis": 6.00,
      "Fittings e aparelhos elétricos": 6.00,
      "Verificação ou certificado de segurança": 6.00,
      "Falhas e reparos elétricos": 6.00,
    },
    "Ampliações": {
      "Extensão de propriedade": 6.00,
      "Conversão de loft": 6.00,
      "Uma varanda": 6.00,
      "Edifício anexo": 6.00,
      "Alterações internas": 6.00,
    },
    "Fascias, Soffits & Calhas": {
      "Somente calhas": 5.00,
      "Somente beirais e / ou guarnições": 5.00,
      "Ambos": 5.00,
    },
    "Cercas": {
      "Esgrima": 5.00,
      "Portões": 5.00,
      "Esgrima e portões": 5.00,
      "Reparar uma cerca ou portão": 4.00,
    },
    "Jardinagem & Paisagismo": {
      "Jardinagem geral": 6.00,
      "Paisagismo": 5.00,
      "Cirurgia de árvores": 6.00,
    },
    "Gás": {
      "Verificação de segurança de gás": 6.00,
      "Serviço de caldeira ou aparelho": 5.00,
      "Instalar ou substituir caldeira ou aparelho": 5.00,
      "Mover ou remover caldeira ou aparelho": 5.00,
      "Apenas tubulações": 5.00,
      "Problema ou reparo": 5.00,
    },
    "Terraplenagem & Fundações": {
      "Fundações para uma estrutura a ser construída": 6.00,
      "Drenagem e tubulação": 6.00,
      "Terraplanagem geral do jardim": 6.00,
    },
    "Faz-tudo": {
      "O trabalho inclui trabalho elétrico": 5.00,
      "O trabalho não inclui trabalho elétrico": 5.00,
    },
    "Isolamento": {
      "Isolamento de sótão / telhado": 5.00,
      "Isolamento de parede": 5.00,
      "Isolamento de piso": 5.00,
    },
    "Instalação de Cozinhas": {
      "Instalação de cozinha nova": 6.00,
      "Instalação de bancada": 6.00,
      "Reforma / substituição de portas de armário": 5.00,
      "Instalar aparelho (pia, forno, lava-louças, etc.)": 5.00,
      "Reparo menor": 5.00,
      "Vários dos itens acima ou outro": 5.00,
    },
    "Chaveiro": {
      "Instalar novas fechaduras": 4.00,
      "Reparar fechaduras": 4.00,
      "Outro (ex. trancado do lado de fora)": 5.00,
    },
    "Conversão de Sótão": {
      "Conversão de sótão com alterações estruturais": 6.00,
      "Conversão de sótão (sem alterações estruturais)": 6.00,
      "Conversão de sótão para fins de armazenamento": 6.00,
      "Instalar uma claraboia": 6.00,
    },
    "Nova Construção": {
      "Eu possuo o terreno em que planejo construir": 6.00,
      "Estou comprando o terreno em que planejo construir": 6.00,
      "Não possuo o terreno em que planejo construir": 6.00,
    },
    "Pintura & Decoração": {
      "Pintura interna": 5.00,
      "Pintura externa": 5.00,
      "Ambos": 5.00,
    },
    "Gesso & Revestimento": {
      "Reboco (interior)": 5.00,
      "Texturização (exterior)": 5.00,
    },
    "Encanamento": {
      "Radiador": 5.00,
      "Caldeiras": 5.00,
      "Aparelhos": 5.00,
      "Fixações": 5.00,
      "Tubulações, torneiras e drenagem": 5.00,
    },
    "Telhados": {
      "Telhado novo ou de substituição": 5.00,
      "Reparo ou avaliação de telhado": 5.00,
      "Trabalho de chaminé": 5.00,
      "Algo mais": 5.00,
    },
    "Sistemas de Segurança": {
      "Sistema de alarme de segurança": 5.00,
      "Câmera de segurança / inteligente": 5.00,
      "Sistema de entrada": 5.00,
      "Alarmes de fumaça": 5.00,
      "Luzes de segurança": 5.00,
      "Trancas": 5.00,
    },
    "Pedreiro": {
      "Construção": 5.00,
      "Reparação": 5.00,
      "Reapontamentos": 5.00,
    },
    "Azulejista": {
      "Telhas novas ou de substituição": 5.00,
      "Reparação / rejuntes de azulejos": 5.00,
    },
    "Cirurgia de Árvores": {
      "Poda ou corte": 5.00,
      "Corte (abate)": 5.00,
      "Remoção apenas de toco": 5.00,
      "Diagnóstico / Avaliação": 4.00,
      "Arbustos ou outras tarefas de jardinagem": 5.00,
    },
    "Instalação de Janelas & Portas": {
      "Janelas novas": 5.00,
      "Portas novas (internas ou externas)": 5.00,
      "Janelas e portas externas novas": 5.00,
      "Substituição de vidro": 5.00,
      "Reparações": 5.00,
    },
  };

  const storeServicesDataInFirestore = async () => {
    const taxasCollectionRef = collection(db, "taxas");

    try {
      // Add the entire servicesData object to the Firestore collection
      await addDoc(taxasCollectionRef, servicesData);
      console.log("Services data added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding services data to Firestore: ", error);
    }
  };

  useEffect(() => {
    //storeServicesDataInFirestore();
    fetchPayments();
  }, [user]);

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
      <div className={styles.paymentsList}>
        {payments.map((payment) => (
          <div key={payment.id}>
            <p>Payment ID: {payment.id}</p>
            <p>Active: {payment.active ? "Yes" : "No"}</p>
            <p>{payment.token.maskedPAN}</p>
          </div>
        ))}
      </div>    </div>
  );
};

export default Payments;
