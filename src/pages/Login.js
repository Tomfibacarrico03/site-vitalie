import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { auth, db } from '../firebase';
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
        <p>Testar com:</p>
        <p>mail: afonsoresendasdades03@gmail.com</p>
        <p>pwd: azazazaz</p>
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
        </div>
    );
};

export default Login;
