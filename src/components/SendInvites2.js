import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import WorkerCard2 from "./cards/WorkerCard2";
import styles from "../css/inviteWorkers.module.css";

const SendInvites = ({ job }) => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "users");

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collectionRef, where("trade_member", "==", true))
        );
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkers(documents);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h3 style={{ fontFamily: "Raleway", marginTop: 35,}} className={styles.title}>
        Trabalhadores recomendados
      </h3>
      {/* Map through pairs of workers and display WorkerCards in pairs */}
      {workers.map((worker, index) => (
          <WorkerCard2 key={worker.id} worker={worker} job={job} />
      ))}
    </div>
  );
};

export default SendInvites;
