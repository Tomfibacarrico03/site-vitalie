import { differenceInMonths } from "date-fns";
import styles from "../../css/inviteWorkers.module.css";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState } from "react";

const WorkerCard = ({ worker, jobId }) => {
  console.log(worker);

  const [invited, setInvited] = useState(worker.invitedJobs.includes(jobId));
  const createdAt = worker.trades_member_since.toDate();
  const monthsSinceCreation = differenceInMonths(new Date(), createdAt);

  let formattedString = "";
  if (monthsSinceCreation === 0) {
    formattedString = "Membro este mês";
  } else {
    formattedString = `Membro há ${monthsSinceCreation} meses`;
  }

  const inviteWorker = async (workerId) => {
    try {
      const userDocRef = doc(db, "users", workerId);

      await updateDoc(userDocRef, {
        invitedJobs: arrayUnion(jobId),
      });

      console.log(
        `Job ${jobId} has been added to the invitedJobs array for user ${workerId}`
      );

      // Update the local state to reflect that the worker has been invited
      setInvited(true);
    } catch (error) {
      console.error("Error inviting worker:", error);
    }
  };

  const removeInviteWorker = async (workerId) => {
    try {
      const userDocRef = doc(db, "users", workerId);

      await updateDoc(userDocRef, {
        invitedJobs: arrayRemove(jobId),
      });

      console.log(
        `Job ${jobId} has been removed from the invitedJobs array for user ${workerId}`
      );

      // Update the local state to reflect that the worker is no longer invited
      setInvited(false);
    } catch (error) {
      console.error("Error removing invitation:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
        padding: 15,
      }}
    >
      <div className={styles.tituloCriticas}>
        <header>
          <h3>{worker.workName}</h3>
          {invited ? (
            <button onClick={() => removeInviteWorker(worker.id)}>
              Remover Convite
            </button>
          ) : (
            <button onClick={() => inviteWorker(worker.id)}>
              Convide para orçamentar
            </button>
          )}
        </header>
        <h5>
          {worker.reviewCount == 0 ? (
            "Ainda sem críticas"
          ) : (
            <>
              {worker.reviewCount} crítica(s) -{" "}
              {(worker.positiveReviewCount / worker.reviewCount) * 100} %
              positivo
            </>
          )}
        </h5>
      </div>

      <div className={styles.local}>
        <p style={{ color: "#000", fontFamily: "Raleway", marginBottom: -5 }}>
          {worker.tradesSelected[0]} - {worker.location[0]}{" "}
        </p>
        <p>{formattedString}</p>
      </div>

      <p
        style={{
          marginLeft: 11,
          borderRadius: 0,
          paddingBottom: 10,
          top: 4,
          alignItems: "center",
          borderBottom: "1px solid #508ce4",
          fontFamily: "Raleway",
        }}
      >
        {worker.description}
      </p>
    </div>
  );
};

export default WorkerCard;
