import { useEffect, useState } from "react";
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
  const { user } = UserAuth(); // Assuming UserAuth provides the user object
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

      setPayments(paymentsData);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const tableStyle = {
    width: "60%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
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
    <div style={{ marginLeft: 600, marginTop: 100 }}>
      <h2 style={titleStyle}>Payment History</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Créditos</th>
            <th style={thStyle}>Valor</th>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Método</th>
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
  );
};

export default Payments;
