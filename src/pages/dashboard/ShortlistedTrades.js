import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import JobCard from "../../components/cards/JobCard";
import { Link } from "react-router-dom";
import styles from "../../css/minhaconta.module.css";
const ShortlistedTrades = () => {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    if (user) {
      const q = query(
        collection(db, "jobs"),
        where("__name__", "in", user.shortlistedJobs)
      );

      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.userId !== user.uid &&
          user.hiredJobs.includes(doc.id) == false
        ) {
          jobs.push({ id: doc.id, ...data });
        }
      });
      setJobs(jobs);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={styles.detalhesContainer}>
      <h2 style={{ fontFamily: "Raleway" }}>
        Trabalhos a que estou adicionado à lista restrita
      </h2>
      {jobs.length === 0 ? (
        <p>Ainda sem atividade</p>
      ) : (
        jobs.map((job) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/meustrabalhos/${job.id}`}
            state={{ job }}
          >
            <JobCard key={job.id} value={{ job, user }} />
          </Link>
        ))
      )}
    </div>
  );
};

export default ShortlistedTrades;
