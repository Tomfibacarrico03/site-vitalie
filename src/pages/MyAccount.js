import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { doc, updateDoc} from 'firebase/firestore';
const MyAccount = () => {

  const navigate = useNavigate()

  const {user, logout} = UserAuth()

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress1(user.address1 || '');
      setAddress2(user.address2 || '');
      setCity(user.city || '');
      setPostalCode(user.postalCode || '');
    }
  }, [user]);


  const handleSave = async () => {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { 
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      postalCode

   });
    console.log('Updated user information saved!');
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Sessão Terminada")
      console.log('You are logged out')
      navigate('/')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Detalhes do contato</h1>
      <div>
        <label htmlFor="firstName">Primeiro Nome:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Segundo Nome:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Número de telefone:</label>
        <input
          id="phoneNumber"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address1">Morada 1:</label>
        <input
          id="address1"
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address2">Morada 2:</label>
        <input
          id="address2"
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="city">Cidade:</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="postalCode">Código Postal:</label>
        <input
          id="postalCode"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Guardar meus detalhes do contato</button>
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
    </div>
  );
};

export default MyAccount;
