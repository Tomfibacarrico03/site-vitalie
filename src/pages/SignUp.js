import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db, functions } from "../firebase";
import Select from "react-select";
import styles from "../css/register.module.css";
import { trades, distritos } from "../lib/SelectOptions";
import { httpsCallable } from "firebase/functions";

const SignUp = () => {
  const navigate = useNavigate();
  const sendEmail = httpsCallable(functions, "sendEmail");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receiveTipsChecked, setReceiveTipsChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState(null);

  const [tradesSelected, setTradesSelected] = useState([]);
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState([]);

  const { createUser, user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsChecked) {
      setError("Please accept the terms and conditions");
      return;
    }

    try {
      const { user } = await createUser(email, password);
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phone,
        address1,
        address2,
        city,
        postalCode,
        trade_member: true,
        tradesSelected,
        interestedJobs: [],
        workName,
        description,
        location,
        interestedJobs: [],
        shortlistedJobs: [],
        invitedJobs: [],
        trades_member_since: serverTimestamp(),
        positiveReviewCount: 0,
        reviewCount: 0,
      });
      setError(null);

      navigate("/minha-conta/detalhes-de-contacto");
      await sendEmail({ email: email, type: "tradesperson" });
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const becomeTradesPerson = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.uid), {
        tradesSelected,
        trade_member: true,
        interestedJobs: [],
        workName,
        description,
        location,
        trades_member_since: serverTimestamp(),
        positiveReviewCount: 0,
        reviewCount: 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {}, [user]);

  const handleSelectedOptionsChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.label);
    setTradesSelected(values);
  };

  const handleSelectedDistritosChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.label);
    setLocation(values);
  };

  return (
    <div className={styles.register}>
      {user && user.email ? (
        <>
          {user.trade_member == false ? (
            <div>
              <h2 style={{ marginLeft: -5 }}>
                Bem vindo, {user.firstName} {user.lastName}
              </h2>
              <h3>Inscreva-se para ser um membro comercial</h3>
              <form onSubmit={becomeTradesPerson}>
                <div>
                  <label htmlFor="trade">Que trabalhos deseja realizar</label>
                  <Select
                    isMulti
                    options={trades}
                    onChange={handleSelectedOptionsChange}
                    placeholder="Selecionar"
                  />

                  <label htmlFor="trade">
                    Pode adicionar mais que um trabalho
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="workName"
                    placeholder="Nome de trabalho"
                    value={workName}
                    onChange={(e) => setWorkName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="description"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location">Localização</label>
                  <Select
                    isMulti
                    options={distritos}
                    onChange={handleSelectedDistritosChange}
                    placeholder="Selecionar"
                  />
                  <label htmlFor="trade">
                    Pode adicionar mais que uma localização
                  </label>
                </div>
                {error && <p>{error}</p>}
                <br></br>
                <button className={styles.btnRegistar} type="submit">
                  Registar como trabalhador
                </button>
              </form>
            </div>
          ) : (
            <h3>Já se inscreveu</h3>
          )}
        </>
      ) : (
        <>
          <h2>Inscreva-se para ser um membro comercial</h2>
          <p></p>
          <form onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              {/* <label htmlFor="lastName">Last Name</label> */}
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              {/* <label htmlFor="phone">Phone Number</label> */}
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              {/* <label htmlFor="email">Email</label> */}
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
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="trade">Que trabalhos deseja realizar</label>
              <Select
                className={styles.select}
                isMulti
                options={trades}
                onChange={handleSelectedOptionsChange}
                placeholder="Selecionar"
              />
              <label htmlFor="trade">Pode adicionar mais que um trabalho</label>
            </div>
            <div>
              <label htmlFor="workName">Nome de trabalho</label>
              <input
                type="text"
                id="workName"
                placeholder="Ex.: Jorge Ferragens & Companhia"
                value={workName}
                onChange={(e) => setWorkName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                id="description"
                placeholder="Inclua todos os detalhes que você acha que o profissional deve saber (local da alteração da parede, prazo, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="location">Localização</label>
              <Select
                isMulti
                options={distritos}
                onChange={handleSelectedDistritosChange}
                placeholder="Selecionar"
              />
              <label htmlFor="location">
                Pode adicionar mais que uma localização
              </label>
            </div>
            <div className={styles.containerTudoCheckBoxes}>
              <div>
                <label
                  className={styles.containerCheckBoxes}
                  htmlFor="termsChecked"
                >
                  Eu concordo com os{" "}
                  <a href="/terms" style={{ color: "#508ce4" }}>
                    Termos e Condições
                  </a>
                  .
                  <input
                    type="checkbox"
                    id="termsChecked"
                    checked={termsChecked}
                    className={styles.checkBox}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    required
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            </div>
            {error && <p>{error}</p>}
            <button className={styles.btnRegistar} type="submit">
              Registar
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUp;
