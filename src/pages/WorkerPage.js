import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const WorkerPage = () => {
  const location = useLocation();
  const { user } = location.state;

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
      <button>Adicionar à shortlist</button>
      <button>Rejeitar</button>
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
