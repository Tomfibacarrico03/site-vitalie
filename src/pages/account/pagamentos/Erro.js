import { useNavigate } from "react-router-dom";
const Erro = () => {
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
      <h1>Erro</h1>
      <button onClick={() => navigate("/minha-conta/pagamentos")}>
        Voltar
      </button>
    </div>
  );
};

export default Erro;
