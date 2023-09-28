import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../css/comerciante.module.css";
import SendInvites from "../components/SendInvites";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const PostedJob = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const documentRef = doc(db, "jobs", jobId);

    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
          setJob(docSnapshot.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [jobId]);

  return (
    <div className={styles.divTotal}>
      <h1>Vamos encontrar os melhores trabalhadores perto de você</h1>

      <Link to={`/meustrabalhos/${jobId}`}>
        <button className={styles.btnVer}>Ver trabalho publicado</button>
      </Link>
      <br></br>

      <p>
        Convida {job && job.invitesLeft} trabalhadores para te darem um
        orçamento. É a melhor maneira para começar uma converça!
      </p>
      <ul>
        <li>Convida</li>
        <li>Obtem respostas</li>
        <li>Adciona à lista restrita</li>
      </ul>

      <SendInvites />
    </div>
  );
};

export default PostedJob;
