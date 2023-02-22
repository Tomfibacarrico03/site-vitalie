import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { auth, db } from '../firebase';

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
        <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password" 
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
