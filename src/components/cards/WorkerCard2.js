import { differenceInMonths } from "date-fns";
import styles from "../../css/inviteWorkers.module.css";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState } from "react";

const WorkerCard = ({ worker, job }) => {
  console.log(worker);

  const [invited, setInvited] = useState(
    job && worker && worker.invitedJobs.includes(job.id)
  );
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
      if (job.invitesLeft < 1) {
        alert("Esgotaste o teu número de convites");
        return;
      }
      const userDocRef = doc(db, "users", workerId);
      const jobDocRef = doc(db, "jobs", job.id);

      await updateDoc(userDocRef, {
        invitedJobs: arrayUnion(job.id),
      });

      await updateDoc(jobDocRef, {
        invitedUsers: arrayUnion(workerId),
        invitesLeft: increment(-1),
      });

      console.log(
        `Job ${job.id} has been added to the invitedJobs array for user ${workerId}`
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
      const jobDocRef = doc(db, "jobs", job.id);

      await updateDoc(userDocRef, {
        invitedJobs: arrayRemove(job.id),
      });

      await updateDoc(jobDocRef, {
        invitedUsers: arrayUnion(workerId),
        invitesLeft: increment(1),
      });

      console.log(
        `Job ${job.id} has been removed from the invitedJobs array for user ${workerId}`
      );

      // Update the local state to reflect that the worker is no longer invited
      setInvited(false);
    } catch (error) {
      console.error("Error removing invitation:", error);
    }
  };

  return (
    <div className={styles.categoriaConvitesDuplos2}>
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

      <div>
        <div className={styles.local}>
          <p style={{ color: "#000", fontFamily: "Raleway", marginBottom: -5 }}>
            {worker.tradesSelected[0]} - {worker.distritos[0]}{" "}
          </p>
          <p>{formattedString}</p>
        </div>

        <p
          style={{
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
    </div>
  );
};

export default WorkerCard;
