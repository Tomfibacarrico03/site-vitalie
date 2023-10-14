import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import WorkerCard from "./cards/WorkerCard";

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

  // Split the workers into pairs
  const pairedWorkers = [];
  for (let i = 0; i < workers.length; i += 2) {
    pairedWorkers.push(workers.slice(i, i + 2));
  }

  return (
    <div>
      <h3 style={{ fontFamily: "Raleway", fontSize: 25, marginTop: 35 }}>
        Trabalhadores recomendados
      </h3>
      {/* Map through pairs of workers and display WorkerCards in pairs */}
      {pairedWorkers.map((pair, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "center" }}>
          {pair.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} job={job} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SendInvites;
