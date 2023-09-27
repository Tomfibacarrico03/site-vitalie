import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import WorkerCard from "../components/cards/WorkerCard";
import styles from "../css/inviteWorkers.module.css";
import { UserAuth } from "../context/AuthContext";

const InviteWorkers = () => {
  const { user } = UserAuth();

  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    const workersRef = collection(db, "users");
    const q = query(workersRef, where("trade_member", "==", true));
    const querySnapshot = await getDocs(q);
    const fetchedWorkers = [];
    querySnapshot.forEach((doc) => {
      if (doc.id != user.uid) {
        fetchedWorkers.push({ id: doc.id, ...doc.data() });
      }
    });
    setWorkers(fetchedWorkers);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div className={styles.convida}>
      <div className={styles.workerCard}>
        {workers.map((worker) => (
          <WorkerCard value={worker} />
        ))}
      </div>
      <div className={styles.cardsLado}>
        <div>
          <h1 style={{fontFamily: "Raleway"}}>Convide trabalhadores para entrar em contato mais rapidamente</h1>
          <h5 style={{fontFamily: "Avenir Next", color: "#8c8c8c"}}>
            Notificamos os trabalhadores sobre seu trabalho, mas também pode
            convidar os profissionais de comércio por conta própria. Se eles
            aceitarem, entrarão em contato para discutir as cotações.
          </h5>
          <br></br>
          <h4 style={{fontFamily: "Raleway"}}>Procure especialistas perto de ti</h4>
          <p style={{marginLeft: -5}}>
            Procure especialistas em conversão perto de si, leia os perfis e
            contacte-os, convidando-os a fazer uma cotação.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default InviteWorkers;
