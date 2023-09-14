import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import JobCard from "../../components/cards/JobCard";
import { Link } from "react-router-dom";
const InterestedTrades = () => {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    if (user) {
      // Get jobs that are in user.interestedJobs
      const interestedJobsQuery = query(
        collection(db, "jobs"),
        where("__name__", "in", user.interestedJobs)
      );

      const interestedJobsQuerySnapshot = await getDocs(interestedJobsQuery);

      const interestedJobs = interestedJobsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter out jobs that are in user.shortlistedJobs
      const jobs = interestedJobs.filter((job) => {
        return !user.shortlistedJobs.includes(job.id);
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
        Trabalhos que tenho interesse
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

export default InterestedTrades;
