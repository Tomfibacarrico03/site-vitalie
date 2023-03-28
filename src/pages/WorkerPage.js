import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const WorkerPage = () => {
  const location = useLocation();
  const { user, job } = location.state;

  const [isUserRejected, setIsUserRejected] = useState(job.rejectedUsers.includes(user.id));

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

  return (
    <div style={{ marginLeft: 771 }}>
      <h1>Worker Page</h1>
      <p>{user.workName}</p>
      <p>Ainda sem feedback</p>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>Interessado no teu trabalho</p>
      <hr />
      <p>Adiciona à shortlist para discutir o trabalho</p>
      <p>Agora</p>
      <p>{user.id}</p>
      {isUserRejected ? (
        <button onClick={handleUndoReject}>Desfazer recusa</button>
      ) : (
        <>
          <button>Adicionar à shortlist</button>
          <button onClick={handleReject}>Recusar</button>
        </>
      )}
      <hr />
      <p>Depois</p>
      <p>
        Uma vez selecionado, você trocará detalhes de contato e poderá solicitar
        cotações
      </p>
      <hr />
      <h3>Perfil</h3>
      <p>{user.description}</p>
      <p>Trabalha nos distritos:</p>
      {user.location.map((location) => (
        <p>{location}</p>
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
