import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import JobCard from "../../components/cards/JobCard";
import { Link } from "react-router-dom";
import styles from "../../css/minhaconta.module.css";

// Utility function to remove duplicate jobs based on job id
const removeDuplicates = (jobs) => {
  return jobs.filter(
    (job, index, self) => index === self.findIndex((j) => j.id === job.id)
  );
};

const NearTrades = () => {
  const { user, loading } = UserAuth(); // Get user and loading from context
  const [jobs, setJobs] = useState([]);
  const [tradesSelected, setTradesSelected] = useState([]);
  const [fetchingJobs, setFetchingJobs] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) {
        setFetchingJobs(false); // Set to false if there's no user
        return;
      }

      // Fetch all jobs that match the user's tradesSelected or concelhos
      const tradeQueries = user.tradesSelected.map((trade) =>
        query(collection(db, "jobs"), where("tradeSelected", "==", trade))
      );

      const concelhoQueries = user.concelhos.map((concelho) =>
        query(collection(db, "jobs"), where("selectedConcelho", "==", concelho))
      );

      // Combine all queries
      const combinedQueries = [...tradeQueries, ...concelhoQueries];

      // Execute all queries in parallel
      const querySnapshots = await Promise.all(
        combinedQueries.map((q) => getDocs(q))
      );

      const fetchedJobs = [];

      // Aggregate results
      querySnapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.userId !== user.uid &&
            !data.interestedUsers.includes(user.uid) &&
            !data.shortlistedUsers.includes(user.uid)
          ) {
            fetchedJobs.push({ id: doc.id, ...data });
          }
        });
      });

      // Remove duplicate jobs
      const uniqueJobs = removeDuplicates(fetchedJobs);
      setJobs(uniqueJobs);
      setFetchingJobs(false); // Set to false after fetching is complete
    };

    if (!loading) {
      fetchJobs();
    }
  }, [user, loading]);

  return (
    <div className={styles.detalhesContainer}>
      <h2 style={{ fontFamily: "Raleway" }}>
        Trabalhos publicados na sua área para si
      </h2>
      {tradesSelected.length > 0 ? (
        tradesSelected.map((trade, index) => <p key={index}>{trade}</p>)
      ) : (
        <p>Sem especializações selecionadas</p>
      )}
      {jobs.length === 0 ? (
        loading || fetchingJobs ? (
          <p>A carregar...</p>
        ) : (
          <p>Ainda sem atividade</p>
        )
      ) : (
        jobs.map((job) => (
          <Link
            key={job.id} // Key moved to the outermost element to avoid warnings
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

export default NearTrades;
