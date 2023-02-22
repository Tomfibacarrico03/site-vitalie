import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doc, setDoc} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext'
import { auth, db } from '../firebase';



const SignUp = () => {
    const navigate = useNavigate()
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [receiveTipsChecked, setReceiveTipsChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [error, setError] = useState(null);
    const { createUser, user, logout } = UserAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!termsChecked) {
        setError('Please accept the terms and conditions');
        return;
      }
  
      try {
        const { user } =await createUser(email, password);
        await setDoc(doc(db, "users", user.uid), { 
            firstName,
            lastName,
            email,
            phone,
            address1,
            address2,
            city,
            postalCode,
            role: 'trade-member'

         }) 
        setError(null);
        navigate('/minha-conta')
      } catch (error) {
        setError(error.message);
      }
    };

    const handleLogout = async () => {
        try {
          await logout();
          alert("Sessão Terminada")
          console.log('You are logged out')
        } catch (e) {
          console.log(e.message);
        }
      };

      useEffect(() => {
        
      }, [user]);
  
    return (
        <div>
        {user && user.email ? (
          <h2>Welcome, {user.email}</h2>
        ) : (
          <>
            <h2>Inscreva-se para ser um membro comercial</h2>
            <p></p>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="receiveTipsChecked"
                        checked={receiveTipsChecked}
                        onChange={(e) => setReceiveTipsChecked(e.target.checked)}
                    />
                    <label htmlFor="receiveTipsChecked">
                        Eu gostaria de receber notícias, conselhos e dicas do MyBuilder
                    </label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="termsChecked"
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        required
                    />
                    <label htmlFor="termsChecked">
                        Eu concordo com os <a href="/terms">termos e condições</a>.
                    </label>
                </div>
              {error && <p>{error}</p>}
              <button type="submit">Sign up</button>
            </form>
          </>
        )}
        {user && (
          <button
            style={{
              backgroundColor: "#f00",
              marginTop: -65,
              borderRadius: 5,
              border: 0,
              padding: 15,
              fontSize: 12,
              marginRight: 0,
              width: "150px",
              position: "absolute",
              fontFamily: "Avenir Next",
              color: "#fff",
              left: 440
            }}
            onClick={handleLogout}
          >
            Terminar Sessão
          </button>
        )}
      </div>
    );
};

export default SignUp;
