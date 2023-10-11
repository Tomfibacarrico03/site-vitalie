import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import JobCard from "../components/cards/JobCard";
import styles from "../css/meustrabalhos.module.css";
import Select from "react-select";

const MyPostedJobs = () => {
  const { user } = UserAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reviewSubmitted = searchParams.get("reviewSubmitted");
  const [jobs, setJobs] = useState([]);

  const [showPopup, setShowPopup] = useState(reviewSubmitted === "true");

  // Function to close the pop-up
  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const q = query(
        collection(db, "jobs"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc") // Add this line to order by createdAt in ascending order
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
      });

      return unsubscribe;
    };

    fetchJobs();
  }, [user.uid]);

  return (
    <div>
    <div>
      {showPopup && (
        <div className={styles.popup}>
          <p className={styles.criticaText} >Crítica enviada com sucesso!</p>
          <button className={styles.fecharBtn} onClick={closePopup}>x</button>
        </div>
      )}

      {showPopup == false && (
        <div className={styles.popup} style={{height: 0}}>
          <p className={styles.criticaText} >Crítica enviada com sucesso!</p>
          <button className={styles.fecharBtn} onClick={closePopup}>x</button>
        </div>
      )}
      </div>
    <div className={styles.trabalhosContainer}>
      
      <div className={styles.detalhesContainer}>
        <h1>Meus Trabalhos publicados</h1>
        <hr></hr>
        {jobs.length === 0 ? (
          <p>
            Ainda não tens nenhum trabalho publicado. Clica em criar trabalho
            para adicionares um.
          </p>
        ) : (
          jobs.map((job, index) => (
            <JobCard key={job.id || index} value={{ job, user }} />
          ))
        )}
      </div>

      <div className={styles.barDir}>
        <header>
          <h1>Contratar pessoas</h1>
        </header>
        <p>
          We have tradespeople ready to help you. Post a job, read reviews and
          hire today.
        </p>
        <Link className={styles.CriarTrabalho} to={"/publicar-trabalho"}>Criar Trabalho</Link>
      </div>
    </div>
    </div>
  );
};

export default MyPostedJobs;
