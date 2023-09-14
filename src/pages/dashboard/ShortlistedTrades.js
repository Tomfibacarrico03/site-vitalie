import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import JobCard from "../../components/cards/JobCard";
import { Link } from "react-router-dom";
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
        if (data.userId !== user.uid) {
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
        Trabalhos a que estou adicionado à lista restrita
      </h2>
      {jobs.map((job) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/meustrabalhos/${job.id}`}
          state={{ job }}
        >
          <JobCard key={job.id} value={{ job, user }} />
        </Link>
      ))}
    </div>
  );
};

export default ShortlistedTrades;
