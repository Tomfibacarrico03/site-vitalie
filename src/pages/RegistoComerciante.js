import React from "react";
import { Link } from 'react-router-dom';

const RegistoComerciante = () => {
  return (
    <div>
      <h1>Seu próximo trabalho é apenas ao virar da esquina</h1>
      <p>
         Há muito trabalho local, mas encontrá-lo é mais fácil dizer do que fazer. No MyBuilder, você define uma área de trabalho personalizada para que cada lead recebido esteja exatamente onde deseja trabalhar.
      </p>
      <Link to="/aplicativo-de-comerciante">
        <button>Registar</button>
      </Link>
    </div>
  );
};

export default RegistoComerciante;
