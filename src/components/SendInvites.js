import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import WorkerCard from "./cards/WorkerCard";

const SendInvites = ({ jobId }) => {
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
      <h3 style={{ fontFamily: "Raleway", fontSize: 25, marginTop: 35 }}>
        Trabalhadores recomendados
      </h3>
      {/* Map through the workers and display WorkerCard for each user */}
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} jobId={jobId} />
      ))}
    </div>
  );
};

export default SendInvites;
