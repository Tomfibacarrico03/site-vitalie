import { useNavigate } from "react-router-dom";

const Sucesso = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <h1>Sucesso</h1>
      <button onClick={() => navigate("/minha-conta/pagamentos")}>
        Voltar
      </button>
    </div>
  );
};

export default Sucesso;
