import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import styles from "../css/workerPage.module.css";

const WorkerPage = () => {
  const location = useLocation();
  const { user, job } = location.state;

  const [isUserRejected, setIsUserRejected] = useState(
    job.rejectedUsers.includes(user.id)
  );
  const [isUserShortlisted, setIsUserShortlisted] = useState(
    job.shortlistedUsers.includes(user.id)
  );

  const handleReject = async () => {
    const jobRef = doc(db, "jobs", job.id);
    try {
      await updateDoc(jobRef, {
        rejectedUsers: [...job.rejectedUsers, user.id],
      });
      setIsUserRejected(true);
      console.log("User added to rejectedUsers field");
    } catch (error) {
      console.error("Error adding user to rejectedUsers field", error);
    }
  };

  const handleUndoReject = async () => {
    const jobRef = doc(db, "jobs", job.id);
    try {
      await updateDoc(jobRef, {
        rejectedUsers: job.rejectedUsers.filter((userId) => userId !== user.id),
      });
      setIsUserRejected(false);
      console.log("User removed from rejectedUsers field");
    } catch (error) {
      console.error("Error removing user from rejectedUsers field", error);
    }
  };

  const [shortlistPopUp, setShortlistPopUp] = useState(false);

  const handleShorlist = async () => {
    const jobRef = doc(db, "jobs", job.id);
    const userRef = doc(db, "users", user.id);

    try {
      await updateDoc(jobRef, {
        shortlistedUsers: arrayUnion(user.id),
      });
      setIsUserShortlisted(true);
      console.log("User added to shortlisted field");

      await updateDoc(userRef, {
        shortlistedJobs: arrayUnion(job.id),
      });
      setShortlistPopUp(true);
      console.log("Job added to user's shortlistedJobs field");
    } catch (error) {
      console.error("Error adding user to shortlisted field", error);
    }
  };

  return (
    <div className={styles.workerPage}>
      <header>
        <h1>{user.workName}</h1>
        <b>Interessado no teu trabalho</b>
      </header>
      <p className={styles.feedback}>Ainda sem feedback</p>

      <p className={styles.nome}>
        {user.firstName} {user.lastName}
      </p>
      <p className={styles.adiciona}>
        Adiciona à shortlist para discutir o trabalho
      </p>

      <div className={styles.agoraDepois}>
        <div className={styles.agora}>
          <p>Agora</p>
          <hr />

          {/* <p>{user.id}</p> */}
          {isUserRejected ? (
            <button onClick={handleUndoReject}>Desfazer recusa</button>
          ) : isUserShortlisted ? (
            <>
              {shortlistPopUp ? (
                <>
                  <p>{user.workName}</p>
                  <p>foi adicionado à tua lista restrita</p>
                  <p>
                    Aguarde um telefonema do {user.firstName} {user.lastName}{" "}
                    para discutir o emprego ou entre em contato diretamente com
                    ele.
                  </p>
                  <p>{user.phone}</p>
                  <button onClick={() => setShortlistPopUp(false)}>
                    Fechar
                  </button>
                </>
              ) : (
                <button>Contrata / Deixa uma crítica</button>
              )}
            </>
          ) : (
            <>
              <>
                {job.shortlistedUsers.lenght == 5 ? (
                  <p>
                    Não podes adicionar mais do que 5 pessoas à lista restrita
                  </p>
                ) : (
                  <button
                    className={styles.adicionarBtn}
                    onClick={handleShorlist}
                  >
                    Adicionar à shortlist
                  </button>
                )}
              </>

              <button className={styles.recusarBtn} onClick={handleReject}>
                Recusar
              </button>
            </>
          )}
        </div>
        <div className={styles.depois}>
          <p>Depois</p>
          <hr />
          <p>
            Uma vez selecionado, você trocará detalhes de contato e poderá
            solicitar cotações
          </p>
        </div>
      </div>

      <h3>
        Perfil de {user.firstName} {user.lastName}
      </h3>
      <p className={styles.descricao}>{user.description}</p>
      {user.location.map((location) => (
        <p>Trabalha nos distritos: {location}</p>
      ))}
      <p>Membro desde: 23 de março</p>
      <h4>Serviços</h4>
      {user.tradesSelected.map((trade, index) => (
        <p>
          {index + 1}. {trade}
        </p>
      ))}
    </div>
  );
};

export default WorkerPage;
