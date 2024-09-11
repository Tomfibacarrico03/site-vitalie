import { useEffect, useState } from "react";
import styles from "../../css/minhaconta.module.css";

import { UserAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

const Payments = () => {
  const { user } = UserAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user) return;

    const paymentsRef = collection(db, `users/${user.uid}/payments`);

    const unsubscribe = onSnapshot(paymentsRef, (snapshot) => {
      const paymentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Check for any MBWAY payment that needs to be expired
      paymentsData.forEach((payment) => {
        if (
          payment.method === "MBWAY" &&
          payment.status === "A aguardar pagamento" &&
          payment.date &&
          new Date() - new Date(payment.date.seconds * 1000) > 4 * 60 * 1000 // Check if 4 minutes have passed
        ) {
          // Update the status to "Expirado"
          const paymentDocRef = doc(
            db,
            `users/${user.uid}/payments`,
            payment.id
          );
          updateDoc(paymentDocRef, { status: "Expirado" });
        }
      });

      // Sort payments by date (most recent first)
      const sortedPayments = paymentsData.sort(
        (a, b) =>
          new Date(b.date.seconds * 1000) - new Date(a.date.seconds * 1000)
      );

      setPayments(sortedPayments);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const tableStyle = {
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

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
          Histórico de Pagamento
        </b>
      </div>
      <div className={styles.tableParent}>
        <table className={styles.table} style={tableStyle}>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Créditos</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Método</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td style={tdStyle}>{payment.status}</td>
                <td style={tdStyle}>{payment.credits}</td>
                <td style={tdStyle}>{payment.amount}€</td>
                <td style={tdStyle}>
                  {new Date(payment.date?.seconds * 1000).toLocaleDateString()}
                </td>
                <td style={tdStyle}>
                  {payment.method == "MBWAY" ? payment.method : "Cartão"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
