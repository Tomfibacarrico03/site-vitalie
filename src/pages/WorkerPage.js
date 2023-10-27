import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "../css/workerPage.module.css";
import { phoneVitalie } from "../imgs/phoneVitalie.png";

const WorkerPage = () => {
  const { jobId, workerId } = useParams();
  const [job, setJob] = useState(null);
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserRejected, setIsUserRejected] = useState(false);
  const [isUserShortlisted, setIsUserShortlisted] = useState(false);

  const navigate = useNavigate();

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
  }, [jobId, workerId, job]);

  const handleReject = async () => {
    const jobRef = doc(db, "jobs", jobId);
    try {
      await updateDoc(jobRef, {
        rejectedUsers: [...job.rejectedUsers, workerId],
      });
      setIsUserRejected(true);
      console.log("User added to rejectedUsers field");
    } catch (error) {
      console.error("Error adding user to rejectedUsers field", error);
    }
  };

  const handleUndoReject = async () => {
    const jobRef = doc(db, "jobs", jobId);
    try {
      await updateDoc(jobRef, {
        rejectedUsers: job.rejectedUsers.filter(
          (userId) => userId !== workerId
        ),
      });
      setIsUserRejected(false);
      console.log("User removed from rejectedUsers field");
    } catch (error) {
      console.error("Error removing user from rejectedUsers field", error);
    }
  };

  const [shortlistPopUp, setShortlistPopUp] = useState(false);

  const handleShorlist = async () => {
    const jobRef = doc(db, "jobs", jobId);
    const userRef = doc(db, "users", workerId);

    try {
      await updateDoc(jobRef, {
        shortlistedUsers: arrayUnion(workerId),
      });
      setIsUserShortlisted(true);
      console.log("User added to shortlisted field");

      await updateDoc(userRef, {
        shortlistedJobs: arrayUnion(jobId),
      });
      setShortlistPopUp(true);
      console.log("Job added to user's shortlistedJobs field");
    } catch (error) {
      console.error("Error adding user to shortlisted field", error);
    }
  };

  const hireWorker = async () => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      const userRef = doc(db, "users", workerId);

      await updateDoc(jobRef, {
        userHired: workerId,
      });

      await updateDoc(userRef, {
        hiredJobs: arrayUnion(jobId),
      });
      if (jobStatusOption == "done") {
        navigate(
          `/meustrabalhos/${jobId}/deixar-critica/trabalhador/${workerId}`
        );
      }
      setIsLeavingReview(!isLeavingReview);
    } catch (error) {
      console.error("Error adding user to shortlisted field", error);
    }
  };

  const [isLeavingReview, setIsLeavingReview] = useState(false);
  const [jobStatusOption, setJobStatusOption] = useState("");

  const reviewCard = (head, body, status) => {
    return (
      <div className={styles.form}>
        <div>
          <h3>{head}</h3>
          <p>{body}</p>
        </div>
        <div className={styles.inputs}>
          <input
            type="checkbox"
            id="reviewCheckbox"
            name="reviewCheckbox"
            checked={jobStatusOption == status}
            onChange={() => setJobStatusOption(status)}
          />
        </div>
      </div>
    );
  };

  if (loading == true) {
    return <h1>Loading</h1>;
  }

  return (
    <div className={styles.workerPage}>
      <header>
        <h1>{worker.workName}</h1>
        <b>
          {worker.hiredJobs.includes(job.id)
            ? "Trabalhador Contratado"
            : "Interessado no teu trabalho"}
        </b>
      </header>
      <p className={styles.feedback}>
        {" "}
        {worker.hiredJobs.includes(job.id)
          ? "Crítica submetida"
          : "Ainda sem feedback"}
      </p>
      <p className={styles.nome}>
        <b style={{ fontSize: 19 }}>
          {worker.firstName} {worker.lastName}
        </b>
        <br></br>
        <div
          style={{ display: "inline-flex", alignItems: "center", marginTop: 5 }}
        >
          <img
            style={{ width: 13, height: 13, marginRight: 5 }}
            src={require("../imgs/phoneVitalie.png")}
          />
          <b style={{ color: "#508ce4" }}>
            {shortlistPopUp == false && isUserShortlisted && worker.phone}
          </b>
        </div>
      </p>
      {!isUserShortlisted && (
        <p className={styles.adiciona}>
          Adiciona à shortlist para discutir o trabalho
        </p>
      )}

      {worker.hiredJobs.includes(job.id) ? null : (
        <div className={styles.estruturaPerfil}>
          {!isLeavingReview && (
            <div className={styles.agoraDepois}>
              <div className={styles.agora}>
                <p>Agora</p>
                <hr />

                {/* <p>{workerId}</p> */}
                {isUserRejected ? (
                  <button onClick={handleUndoReject}>Desfazer recusa</button>
                ) : isUserShortlisted ? (
                  <>
                    {shortlistPopUp == true ? (
                      <>
                        <p>{worker.workName}</p>
                        <p
                          style={{
                            backgroundColor: "#333",
                            textAlign: "center",
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginBottom: 5,
                            borderRadius: 5,
                            fontSize: 12,
                            color: "#fff",
                            fontWeight: "400",
                          }}
                        >
                          Foi adicionado à tua lista restrita
                        </p>
                        <p>
                          Aguarde um telefonema do {worker.firstName}{" "}
                          {worker.lastName} para discutir o emprego ou entre em
                          contato diretamente com ele.
                        </p>
                        <p>{worker.phone}</p>
                        <button
                          className={styles.btnFechar}
                          onClick={() => setShortlistPopUp(false)}
                        >
                          Fechar
                        </button>
                      </>
                    ) : (
                      <>
                        {job.userHired != "" ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/meustrabalhos/${jobId}/deixar-critica/trabalhador/${workerId}`
                              )
                            }
                          >
                            Deixar uma crítica{" "}
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsLeavingReview(!isLeavingReview)}
                          >
                            Contrata / Deixar uma crítica
                          </button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <>
                      {job.shortlistedUsers.lenght == 5 ? (
                        <p>
                          Não podes adicionar mais do que 5 pessoas à lista
                          restrita
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

                    <button
                      className={styles.recusarBtn}
                      onClick={handleReject}
                    >
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
          )}
          {!isLeavingReview ? (
            <div className={styles.perfilDoMan}>
              <h3>
                Perfil de {worker.firstName} {worker.lastName}
              </h3>
              <p className={styles.descricao}>{worker.description}</p>
              {worker.location.map((location) => (
                <p>Trabalha nos distritos: {location}</p>
              ))}
              <p>Membro desde: 23 de março</p>
              <h4>Serviços</h4>
              {worker.tradesSelected.map((trade, index) => (
                <p>
                  {index + 1}. {trade}
                </p>
              ))}
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: 25, paddingTop: 35 }}>
                Contrata {worker.workName}
              </h2>
              <p style={{ marginRight: 10 }}>
                Conte-nos sobre o status do seu trabalho. Avisaremos a outros
                comerciantes que seu trabalho não é mais disponível. Você também
                pode deixar comentários quando o trabalho for concluído
              </p>
              <div>
                {reviewCard(
                  "Trabalho ainda não começou",
                  "Eu já acordei num preço e contratei este trabalhador",
                  "not_started"
                )}
                {reviewCard(
                  "Trabalho em progresso",
                  "Trabalho em andamente neste momento",
                  "on_going"
                )}
                {reviewCard(
                  "Trabalho concluído",
                  "Deves deixar um feedback quando estiveres pronto",
                  "done"
                )}
              </div>
              <div>
                <button onClick={() => setIsLeavingReview(!isLeavingReview)}>
                  Cancelar
                </button>
                <button onClick={() => hireWorker()}>Continuar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkerPage;
