import React, { useState, useEffect } from "react";
import { useNavigate,Link, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "../../firebase";
import { FaCreditCard, FaTrash } from 'react-icons/fa';
import {
  serverTimestamp,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import styles from "../../css/minhaconta.module.css";

const Payments = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const { user } = UserAuth();
  const [spgContext, setSpgContext] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [spgSignature, setSpgSignature] = useState("");
  const [spgConfig, setSpgConfig] = useState({});
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

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
        background: "blue",
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
        const responseData = JSON.parse(res.data.result);
        setSpgContext(responseData.formContext);
        setTransactionID(responseData.transactionID);
        setSpgSignature(responseData.transactionSignature);
        setSpgConfig({
          paymentMethodList: [],
          amount: {
            value: responseData.amount.value,
            currency: responseData.amount.currency,
          },
          language: "pt",
          redirectUrl: "http://localhost:3000/minha-conta/pagamentos",
          customerData: null,
        });
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
    const paymentId = searchParams.get("id");
    async function checkAndSavePayment() {
      if (paymentId) {
        console.log("paymentId: " + paymentId);
        const url = `https://us-central1-site-vitalie.cloudfunctions.net/statusTransaction?userId=${user.uid}&transactionId=${paymentId}`;

        fetch(url)
          .then((response) => null)
          .then((res) => {
            navigate("/minha-conta/detalhes-de-contacto")
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
      "Conceitos fundamentais de design (para gerar orçamentos e apresentar pedidos de planejamento)": 8.0,
      "Plantas detalhadas em conformidade (para construtores e regulamentos de construção)": 8.0,
      "Cálculos de estrutura de construção": 8.0,
    },
    "Instalação de Banheiros": {
      "Renovação / instalação de banheiro": 6.0,
      "Instalar ou substituir um dispositivo": 5.0,
      Reparar: 5.0,
      Azulejos: 6.0,
    },
    "Alvenaria & Rejuntamento": {
      "Construindo uma parede": 5.0,
      "Construção de uma estrutura": 5.0,
      "Trabalho de alvenaria personalizado": 5.0,
      "Alterações na parede": 5.0,
      Reapontamento: 5.0,
      "Trabalho na chaminé": 4.0,
      Reparos: 5.0,
    },
    "Carpintaria & Marcenaria": {
      "Portas, janelas e pisos": 6.0,
      "Fabricação, montagem e reparos de móveis": 5.0,
      "Unidades de cozinha e bancadas": 6.0,
      "Área coberta": 5.0,
    },
    "Carpetes, Lino & Pisos": {
      "Piso novo ou substituição": 5.0,
      "Lixamento / restauração": 5.0,
      "Reparo / ajuste": 5.0,
    },
    "Aquecimento Central": {
      Caldeira: 6.0,
      "Tubulação / fornecimento": 6.0,
      Radiadores: 6.0,
      Termostato: 6.0,
      "Aquecimento de piso": 6.0,
      "Instalação completa do sistema": 7.0,
    },
    "Chaminé & Lareira": {
      Chaminé: 5.0,
      Lareira: 5.0,
    },
    Conversões: {
      "Conversão de sotão": 5.0,
      "Conversão de um espaço existente": 6.0,
      "Alteração de paredes": 5.0,
      "Restaurar ou melhorar um espaço existente": 5.0,
    },
    "Prova de Humidade": {
      "Não - Preciso de ajuda para investigar": 6.0,
      "Sim - Preciso apenas de ajuda para resolver o problema": 6.0,
    },
    "Demolição & Limpeza": {
      "Remoção de lixo apenas": 5.0,
      "Demolição de edifícios / estruturas": 8.0,
      "Derrubar uma parede": 5.0,
    },
    "Entradas & Paving": {
      "Instalar / Reparar uma entrada": 5.0,
      "Limpar ou selar uma entrada": 5.0,
      "Kerb suspenso (crossover)": 5.0,
      "Pavimentação, pátios e caminhos": 5.0,
    },
    Elétrica: {
      "Refazer circuitos": 6.0,
      "Caixas de fusíveis": 6.0,
      "Fittings e aparelhos elétricos": 6.0,
      "Verificação ou certificado de segurança": 6.0,
      "Falhas e reparos elétricos": 6.0,
    },
    Ampliações: {
      "Extensão de propriedade": 6.0,
      "Conversão de loft": 6.0,
      "Uma varanda": 6.0,
      "Edifício anexo": 6.0,
      "Alterações internas": 6.0,
    },
    "Fascias, Soffits & Calhas": {
      "Somente calhas": 5.0,
      "Somente beirais e / ou guarnições": 5.0,
      Ambos: 5.0,
    },
    Cercas: {
      Esgrima: 5.0,
      Portões: 5.0,
      "Esgrima e portões": 5.0,
      "Reparar uma cerca ou portão": 4.0,
    },
    "Jardinagem & Paisagismo": {
      "Jardinagem geral": 6.0,
      Paisagismo: 5.0,
      "Cirurgia de árvores": 6.0,
    },
    Gás: {
      "Verificação de segurança de gás": 6.0,
      "Serviço de caldeira ou aparelho": 5.0,
      "Instalar ou substituir caldeira ou aparelho": 5.0,
      "Mover ou remover caldeira ou aparelho": 5.0,
      "Apenas tubulações": 5.0,
      "Problema ou reparo": 5.0,
    },
    "Terraplenagem & Fundações": {
      "Fundações para uma estrutura a ser construída": 6.0,
      "Drenagem e tubulação": 6.0,
      "Terraplanagem geral do jardim": 6.0,
    },
    "Faz-tudo": {
      "O trabalho inclui trabalho elétrico": 5.0,
      "O trabalho não inclui trabalho elétrico": 5.0,
    },
    Isolamento: {
      "Isolamento de sótão / telhado": 5.0,
      "Isolamento de parede": 5.0,
      "Isolamento de piso": 5.0,
    },
    "Instalação de Cozinhas": {
      "Instalação de cozinha nova": 6.0,
      "Instalação de bancada": 6.0,
      "Reforma / substituição de portas de armário": 5.0,
      "Instalar aparelho (pia, forno, lava-louças, etc.)": 5.0,
      "Reparo menor": 5.0,
      "Vários dos itens acima ou outro": 5.0,
    },
    Chaveiro: {
      "Instalar novas fechaduras": 4.0,
      "Reparar fechaduras": 4.0,
      "Outro (ex. trancado do lado de fora)": 5.0,
    },
    "Conversão de Sótão": {
      "Conversão de sótão com alterações estruturais": 6.0,
      "Conversão de sótão (sem alterações estruturais)": 6.0,
      "Conversão de sótão para fins de armazenamento": 6.0,
      "Instalar uma claraboia": 6.0,
    },
    "Nova Construção": {
      "Eu possuo o terreno em que planejo construir": 6.0,
      "Estou comprando o terreno em que planejo construir": 6.0,
      "Não possuo o terreno em que planejo construir": 6.0,
    },
    "Pintura & Decoração": {
      "Pintura interna": 5.0,
      "Pintura externa": 5.0,
      Ambos: 5.0,
    },
    "Gesso & Revestimento": {
      "Reboco (interior)": 5.0,
      "Texturização (exterior)": 5.0,
    },
    Encanamento: {
      Radiador: 5.0,
      Caldeiras: 5.0,
      Aparelhos: 5.0,
      Fixações: 5.0,
      "Tubulações, torneiras e drenagem": 5.0,
    },
    Telhados: {
      "Telhado novo ou de substituição": 5.0,
      "Reparo ou avaliação de telhado": 5.0,
      "Trabalho de chaminé": 5.0,
      "Algo mais": 5.0,
    },
    "Sistemas de Segurança": {
      "Sistema de alarme de segurança": 5.0,
      "Câmera de segurança / inteligente": 5.0,
      "Sistema de entrada": 5.0,
      "Alarmes de fumaça": 5.0,
      "Luzes de segurança": 5.0,
      Trancas: 5.0,
    },
    Pedreiro: {
      Construção: 5.0,
      Reparação: 5.0,
      Reapontamentos: 5.0,
    },
    Azulejista: {
      "Telhas novas ou de substituição": 5.0,
      "Reparação / rejuntes de azulejos": 5.0,
    },
    "Cirurgia de Árvores": {
      "Poda ou corte": 5.0,
      "Corte (abate)": 5.0,
      "Remoção apenas de toco": 5.0,
      "Diagnóstico / Avaliação": 4.0,
      "Arbustos ou outras tarefas de jardinagem": 5.0,
    },
    "Instalação de Janelas & Portas": {
      "Janelas novas": 5.0,
      "Portas novas (internas ou externas)": 5.0,
      "Janelas e portas externas novas": 5.0,
      "Substituição de vidro": 5.0,
      Reparações: 5.0,
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
  const deletePayment = async (paymentId) => {
    try {
      const paymentDocRef = doc(db, "payments", paymentId);
      await deleteDoc(paymentDocRef);
      fetchPayments();
      console.log(`Payment with ID ${paymentId} deleted.`);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };
  const updateActiveStatus = async (paymentId) => {
    try {
      const paymentsRef = collection(db, "payments");
      const querySnapshot = await getDocs(paymentsRef);

      await Promise.all(querySnapshot.docs.map(async (paymentDoc) => {
        const docRef = doc(db, "payments", paymentDoc.id);
        const isActive = paymentDoc.id === paymentId;

        await updateDoc(docRef, { active: isActive });
      }));
      fetchPayments();
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  };
  useEffect(() => {
    // This code will run after the component has mounted
    console.log("in the function!!!");
    // Find the element by class name
    const elementToDelete = document.querySelector('.payment-value');

    // Check if the element exists before attempting to delete it
    if (elementToDelete) {
      // Remove the element
      elementToDelete.remove();
    }
  }, [spgContext]);
  return (
    <div className={styles.detalhesContainer}>
      {spgContext ? (
        <div className={styles.addCardWindow} onClick={()=>{window.location.reload()}}>
          <div className={styles.form}>
            <form
              className="paymentSPG"
              spg-signature={spgSignature}
              spg-context={spgContext}
              spg-config={JSON.stringify(spgConfig)}
              spg-style={JSON.stringify(spgStyle)}
            ></form>
          </div>
          
        </div>
      ) : null}
      <div className={styles.headerList}>
        <b
          style={{
            fontFamily: "Raleway",
            fontSize: 32,
          }}
        >
          Pagamentos
        </b>
        <button className={styles.addCardBtn} onClick={requestForm}>
          Adicionar Cartão
        </button>
      </div>
      <div className={styles.paymentsList}>
        {payments.length == "0" ? <p>Não tem cartões associados</p> : null}
        {payments.map((payment) => (
          <div className={payment.active ? styles.listPaySelected : styles.listPay}
            onClick={() => updateActiveStatus(payment.id)}
            key={payment.id}>
            <div className={styles.cardNumber}>
              {/* <p>Payment ID: {payment.id}</p> */}
              <FaCreditCard style={{ fontSize: "1.5rem" }} />
              {" "}
              {payment.token.maskedPAN}
              {" "}
              {new Date(payment.token.expireDate).getUTCFullYear()}
              {"/"}
              {new Date(payment.token.expireDate).getUTCMonth()}
            </div>
            <div>
              <button className={styles.eliCardBtn} onClick={() => deletePayment(payment.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
