import { useState, useEffect, useRef } from "react";
import styles from "../../css/minhaconta.module.css";
import { UserAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

const Creditos = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  const [showMBWAYForm, setShowMBWAYForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] =
    useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const { user } = UserAuth();

  // To reference the modal container
  const modalRef = useRef(null);

  const creditPacks = [
    { credits: 10, price: "10.00€" },
    { credits: 30, price: "25.00€" },
    { credits: 60, price: "50.00€" },
    { credits: 140, price: "100.00€" },
  ];

  const openModal = (pack) => {
    setSelectedPack(pack);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPack(null);
    setShowMBWAYForm(false);
    setShowCardForm(false);
    setIsWaitingForConfirmation(false);
    setIsPaymentConfirmed(false);
  };

  const showMBWAYFields = () => {
    setShowMBWAYForm(true);
  };

  const showCardFields = () => {
    setShowCardForm(true);
  };

  const goBackToPaymentOptions = () => {
    setShowMBWAYForm(false);
    setShowCardForm(false);
    setIsWaitingForConfirmation(false);
    setIsPaymentConfirmed(false);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleMBWAYConfirmation = async () => {
    if (phoneNumber.trim() === "") {
      alert("Por favor, insira um número de telefone válido.");
      return;
    }

    const paymentsCollectionRef = collection(db, `users/${user.uid}/payments`);
    const paymentData = {
      credits: selectedPack.credits,
      amount: selectedPack.price.replace("€", "").trim(),
      date: serverTimestamp(),
      method: "MBWAY",
      status: "A aguardar pagamento",
    };

    try {
      const paymentDocRef = await addDoc(paymentsCollectionRef, paymentData);
      const paymentDocId = paymentDocRef.id;

      setIsWaitingForConfirmation(true);

      const response = await fetch("https://meujob.vercel.app/api/mbway", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: `${user.uid}-${paymentDocId}`,
          value: paymentData.amount,
          phone: phoneNumber,
          email: "teste@eupago.pt",
        }),
      });

      const data = await response.json();

      if (response.ok && data.transactionStatus !== "Rejected") {
        onSnapshot(paymentDocRef, (doc) => {
          const paymentStatus = doc.data().status;
          if (paymentStatus === "Pago") {
            setIsPaymentConfirmed(true);
            setIsWaitingForConfirmation(false);
          } else if (paymentStatus === "A aguardar pagamento") {
            setIsWaitingForConfirmation(true);
          }
        });
      } else {
        alert(`Erro no pagamento: ${data.message}`);
        setIsWaitingForConfirmation(false);
      }
    } catch (error) {
      alert("Ocorreu um erro ao processar o pagamento.");
      console.error("Payment error:", error);
      setIsWaitingForConfirmation(false);
    }
  };

  const handleCardPayment = async () => {
    try {
      const response = await fetch("https://meujob.vercel.app/api/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: `${user.uid}-CARD`,
          value: selectedPack.price.replace("€", "").trim(),
          email: user.email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.transactionStatus === "Success") {
        window.location.href = data.redirectUrl;
      } else {
        alert(`Erro no pagamento: ${data.message}`);
      }
    } catch (error) {
      console.error("Card payment error:", error);
      alert("Ocorreu um erro ao processar o pagamento.");
    }
  };

  // Handle clicks outside of the modal to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div className={styles.detalhesContainer}>
      <div className={styles.headerList}>
        <b
          style={{
            fontFamily: "Raleway",
            fontSize: 32,
            paddingTop: 25,
          }}
        >
          Créditos
        </b>
      </div>
      <header>
        {creditPacks.map((pack, index) => (
          <div key={index} className={styles.creditPack}>
            <b>{pack.credits} Créditos</b>
            <p className={styles.price}>{pack.price}</p>
            <button
              className={styles.buyButton}
              onClick={() => openModal(pack)}
            >
              Comprar
            </button>
          </div>
        ))}
      </header>

      {showModal && (
        <div className={styles.modalOverlay}>
          <header>
            <div
              className={styles.modalContent}
              ref={modalRef}
              style={{ paddingBottom: !isPaymentConfirmed ? 35 : -15 }}
            >
              {!isPaymentConfirmed && (
                <>
                  <h2>Escolha o método de pagamento</h2>
                  <p>
                    Você está comprando {selectedPack?.credits} Créditos por{" "}
                    {selectedPack?.price}
                  </p>
                </>
              )}

              {!showMBWAYForm && !showCardForm ? (
                <div className={styles.paymentOptions}>
                  <button
                    className={styles.paymentButton}
                    onClick={showCardFields}
                  >
                    Cartão
                  </button>
                  <button
                    className={styles.paymentButton}
                    onClick={showMBWAYFields}
                  >
                    MBWAY
                  </button>
                </div>
              ) : showCardForm ? (
                <div className={styles.cardForm}>
                  {!isWaitingForConfirmation && !isPaymentConfirmed ? (
                    <>
                      <button
                        className={styles.confirmButton}
                        onClick={handleCardPayment}
                      >
                        Confirmar
                      </button>
                    </>
                  ) : isWaitingForConfirmation ? (
                    <p>Aguardando confirmação do pagamento...</p>
                  ) : (
                    <p>Pagamento confirmado com sucesso!</p>
                  )}
                </div>
              ) : (
                <div className={styles.mbwayForm}>
                  {!isWaitingForConfirmation && !isPaymentConfirmed ? (
                    <>
                      <p
                        style={{
                          fontSize: 14,
                          marginBottom: 0,
                          marginTop: 25,
                          fontWeight: 300,
                        }}
                      >
                        *Só disponível para números portugueses
                      </p>
                      <input
                        type="text"
                        placeholder="Número de telefone"
                        className={styles.mbwayInput}
                        style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                      <button
                        className={styles.confirmButton}
                        onClick={handleMBWAYConfirmation}
                      >
                        Confirmar
                      </button>
                    </>
                  ) : isWaitingForConfirmation ? (
                    <p>Aguardando confirmação do MB WAY...</p>
                  ) : (
                    <p>Pagamento confirmado com sucesso!</p>
                  )}
                </div>
              )}

              <button
                className={styles.closeButton}
                onClick={
                  !showMBWAYForm && !showCardForm
                    ? closeModal
                    : goBackToPaymentOptions
                }
              >
                {!showMBWAYForm && !showCardForm ? (
                  <p>&#10005;</p>
                ) : (
                  <p>&#8592;</p>
                )}
              </button>
            </div>
          </header>
        </div>
      )}
    </div>
  );
};

export default Creditos;
