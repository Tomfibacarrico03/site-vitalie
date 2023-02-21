import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext'
const MyAccount = () => {

  const {user} = UserAuth()
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address1, setAddress1] = useState(user.address1);
  const [address2, setAddress2] = useState(user.address2);
  const [city, setCity] = useState(user.city);
  const [postalCode, setPostalCode] = useState(user.postalCode);

  const handleSave = () => {
    // Here you can write the logic to save the updated user information
    // to your backend or database
    console.log('Updated user information saved!');
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
    </div>
  );
};

export default MyAccount;
