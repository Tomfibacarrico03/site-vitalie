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

  useEffect(() => {
    // Create a function to fetch job documents for each jobId
    const fetchJobs = async () => {
      try {
        const jobPromises = user.invitedJobs.map(async (jobId) => {
          const docRef = doc(collection(db, "jobs"), jobId); // Create a reference to the document
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const jobData = { ...docSnapshot.data(), id: docSnapshot.id };
            setJobs((prevJobs) => [...prevJobs, jobData]);
          } else {
            console.log(`Job with ID ${jobId} not found.`);
          }
        });

        await Promise.all(jobPromises);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // Fetch job documents when the component mounts
    fetchJobs();
  }, [user.invitedJobs]);

  return (
    <div className={styles.detalhesContainer}>
      <h2 style={{ fontFamily: "Raleway" }}>Trabalhos a que fui convidado</h2>
      {jobs.map((job) => (
        <Link
          key={job.id} // Add key prop here
          style={{ textDecoration: "none" }}
          to={`/meustrabalhos/${job.id}`}
          state={{ job }}
        >
          <JobCard value={{ job, user }} />
        </Link>
      ))}
    </div>
  );
};

export default InvitedTrades;
