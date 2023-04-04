import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import styles from "../css/login.module.css";


const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { signIn } = UserAuth();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await signIn(email, password);
            navigate('/minha-conta')
        }
        catch (error)  {
            setErrorMessage(error.message);
        };
    };

    return (
        <div className={styles.login}>
        <h2 style={{color: "#219ebc"}}>Bem-vindo de Volta!</h2>
        <form onSubmit={handleLogin}>
            <div>
            <input 
                type="email" 
                id="email" 
                placeholder='Email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            </div>
            <div>
            <input 
                type="password" 
                id="password" 
                placeholder='Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            </div>
            <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
            <h2>Novo?</h2>
            <p>Procurando um construtor ou comerciante?
                Publique seu trabalho aqui e obtenha respostas rápidas de comerciantes locais de boa reputação.</p>
            <p>Criar trabalho</p>
            <p>Inscreva-se como comerciante
                 Ajudamos os comerciantes a obter o tipo certo de trabalho, da maneira mais acessível.</p>
            <p>Tornar-se trabalhador</p>
        </div>
        </div>
    );
};

export default Login;
