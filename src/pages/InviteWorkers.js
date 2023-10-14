import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import WorkerCard from "../components/cards/WorkerCard";
import styles from "../css/inviteWorkers.module.css";
import { UserAuth } from "../context/AuthContext";
import SendInvites2 from "../components/SendInvites2";
import { useParams } from "react-router-dom";

const InviteWorkers = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const documentRef = doc(db, "jobs", jobId);

    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
          setJob({ ...docSnapshot.data(), id: docSnapshot.id });
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    fetchData();
  }, [jobId]);

  return (
    <div className={styles.convida}>
      {isLoading ? ( // Display loading indicator
        <p>Loading...</p>
      ) : (
        <>
          <SendInvites2 job={job} />
          <div className={styles.cardsLado}>
            <div>
              <h1 style={{ fontFamily: "Raleway"}}>
                Convide trabalhadores para entrar em contato mais rapidamente
              </h1>
              <h5 style={{ fontFamily: "Avenir Next", color: "#8c8c8c" }}>
                Notificamos os trabalhadores sobre seu trabalho, mas também pode
                convidar os profissionais de comércio por conta própria. Se eles
                aceitarem, entrarão em contato para discutir as cotações.
              </h5>
              <br></br>
              <h4 style={{ fontFamily: "Raleway" }}>
                Procure especialistas perto de ti
              </h4>
              <p style={{ marginLeft: -5 }}>
                Procure especialistas em conversão perto de si, leia os perfis e
                contacte-os, convidando-os a fazer uma cotação.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InviteWorkers;
