import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import styles from "../css/login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { signIn } = UserAuth();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await signIn(email, password);

      navigate("/minha-conta/detalhes-de-contacto");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.login}>
      <h2>Bem-vindo de Volta!</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.btnEntrar} type="submit">
          Entrar
        </button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
      <Link className={styles.trabalhadorBtn} to={`/recuperar-palavra-passe`}>
        <p>Esqueci-me da palavra-passe</p>
      </Link>
      <div>
        <Link to="/publicar-trabalho" style={{ textDecoration: "none" }}>
          <li>Novo?</li>
        </Link>
        <p>
          Procurando um construtor ou comerciante? Publique seu trabalho aqui e
          obtenha respostas rápidas de comerciantes locais de boa reputação.
        </p>
        <Link to="/publicar-trabalho" style={{ textDecoration: "none" }}>
          <li>Criar trabalho</li>
        </Link>
        <p>
          Inscreva-se como comerciante Ajudamos os comerciantes a obter o tipo
          certo de trabalho, da maneira mais acessível.
        </p>
        <Link
          className={styles.trabalhadorBtn}
          to={`/aplicativo-de-comerciante`}
        >
          <p>Tornar-se trabalhador</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
