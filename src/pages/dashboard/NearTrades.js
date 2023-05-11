import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import JobCard from "../../components/cards/JobCard";
import { Link } from "react-router-dom";
const NearTrades = () => {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (user) {
        const q = query(
          collection(db, "jobs"),
          where("tradeSelected", "in", user.tradesSelected)
        );
        const querySnapshot = await getDocs(q);

        const jobs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.userId !== user.uid &&
            !data.interestedUsers.includes(user.uid) &&
            !data.shortlistedUsers.includes(user.uid)
          ) {
            jobs.push({ id: doc.id, ...data });
          }
        });
        setJobs(jobs);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "40%",
        padding: 20,
        position: "absolute",
        right: 200,
        marginTop: 20,
        borderRadius: 5,
      }}
    >
      <h2 style={{ fontFamily: "Avenir Next" }}>
        Trabalhos publicados na sua área para si
      </h2>
      {user.tradesSelected.map((trade) => (
        <p>{trade}</p>
      ))}
      {jobs.map((job) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/meustrabalhos/${job.id}`}
          state={{ job }}
        >
          <JobCard key={job.id} value={job} />
        </Link>
      ))}
    </div>
  );
};

export default NearTrades;
