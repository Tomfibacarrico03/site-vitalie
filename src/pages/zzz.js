import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "../css/workerPage.module.css";

import concelhos from "../lib/concelhos";

const WorkerPage = () => {
  const { jobId, workerId } = useParams();

  const [job, setJob] = useState(null);
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserRejected, setIsUserRejected] = useState(false);
  const [isUserShortlisted, setIsUserShortlisted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({});

  useEffect(() => {
    const fetchJobAndWorkerData = async () => {
      // Fetch job data by jobId
      const jobDocRef = doc(db, "jobs", jobId);
      const jobSnapshot = await getDoc(jobDocRef);

      if (jobSnapshot.exists()) {
        const jobData = jobSnapshot.data();
        setJob({ ...jobData, id: jobSnapshot.id });

        // Check if the worker is rejected or shortlisted
        setIsUserRejected(jobData.rejectedUsers.includes(workerId));
        setIsUserShortlisted(jobData.shortlistedUsers.includes(workerId));
      } else {
        console.log(`Job with ID ${jobId} not found.`);
      }

      // Fetch worker data by workerId
      const workerDocRef = doc(db, "users", workerId);
      const workerSnapshot = await getDoc(workerDocRef);

      if (workerSnapshot.exists()) {
        const workerData = workerSnapshot.data();
        setWorker(workerData);
      } else {
        console.log(`Worker with ID ${workerId} not found.`);
      }

      // Data fetching is complete, set loading to false
      setLoading(false);
    };

    fetchJobAndWorkerData();
  }, [jobId, workerId]);

  const toggleDropdown = (distrito) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [distrito]: !prevState[distrito],
    }));
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className={styles.workerPage}>
      <h2>Worker's Selected Distritos and Concelhos</h2>
      <ul>
        {worker.distritos
          .filter((distrito) =>
            worker.concelhos.some((concelho) =>
              concelhos[distrito].includes(concelho)
            )
          )
          .map((distrito) => (
            <li key={distrito} className={styles.distritoItem}>
              <div
                className={styles.distritoHeader}
                onClick={() => toggleDropdown(distrito)}
              >
                <span>{distrito}</span>
                <span className={styles.dropdownArrow}>
                  {openDropdown[distrito] ? "▼" : "►"}
                </span>
              </div>
              {openDropdown[distrito] && (
                <ul className={styles.concelhosList}>
                  {worker.concelhos
                    .filter((concelho) =>
                      concelhos[distrito].includes(concelho)
                    )
                    .map((concelho) => (
                      <li key={concelho}>{concelho}</li>
                    ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WorkerPage;
