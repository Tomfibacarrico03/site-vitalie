import React, { useState, useEffect } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import JobCard from "../../components/cards/JobCard";
import { Link } from "react-router-dom";
import styles from "../../css/minhaconta.module.css";

const InvitedTrades = () => {
  const [jobs, setJobs] = useState([]);

  const { user } = UserAuth();

  const jobCollection = collection(db, "jobs");
  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = [];

      const userShortlistedJobs = user.shortlistedJobs || [];
      const userHiredJobs = user.hiredJobs || [];

      for (const jobId of user.invitedJobs) {
        if (
          !userShortlistedJobs.includes(jobId) &&
          !userHiredJobs.includes(jobId)
        ) {
          const jobRef = doc(jobCollection, jobId);
          const jobSnapshot = await getDoc(jobRef);

          if (jobSnapshot.exists()) {
            jobsData.push({ ...jobSnapshot.data(), id: jobSnapshot.id });
          }
        }
      }

      setJobs(jobsData);
    };

    fetchJobs();
  }, [user.invitedJobs, user.shortlistedJobs, user.hiredJobs, jobCollection]);

  return (
    <div className={styles.detalhesContainer}>
      <h2 style={{ fontFamily: "Raleway" }}>Trabalhos a que fui convidado</h2>
      {jobs.length === 0 ? (
        <p>Ainda sem atividade</p>
      ) : (
        jobs.map((job) => (
          <Link
            key={job.id}
            style={{ textDecoration: "none" }}
            to={`/meustrabalhos/${job.id}`}
            state={{ job }}
          >
            <JobCard value={{ job, user }} />
          </Link>
        ))
      )}
    </div>
  );
};

export default InvitedTrades;
