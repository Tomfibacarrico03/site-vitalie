import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db, functions } from "../firebase";
import Select from "react-select";
import styles from "../css/register.module.css";
import { trades, distritos } from "../lib/SelectOptions";
import { httpsCallable } from "firebase/functions";
import concelhos from "../lib/concelhos";
import hide from "../imgs/hideIcon.png";
import show from "../imgs/viewIcon.png";

const SignUp = () => {
  const navigate = useNavigate();
  const sendEmail = httpsCallable(functions, "sendEmail");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [termsChecked, setTermsChecked] = useState(false);

  const [error, setError] = useState(null);

  const [tradesSelected, setTradesSelected] = useState([]);
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder a palavra-passe

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      // Update the isMobile state based on the screen width
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for mobile device on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

        trade_member: true,
        tradesSelected,
        interestedJobs: [],
        workName,
        description,
        distritos,
        concelhos,
        interestedJobs: [],
        shortlistedJobs: [],
        invitedJobs: [],
        hiredJobs: [],
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
        distritos,
        concelhos,
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

  const [selectedDistritos, setSelectedDistritos] = useState([]);
  const [selectedConcelhos, setSelectedConcelhos] = useState([]);

  const getConcelhoOptions = () => {
    // Combine the concelhos for all selected distritos
    return selectedDistritos.map((distrito) => ({
      label: distrito.label,
      options:
        concelhos[distrito.value]?.map((concelho) => ({
          value: concelho,
          label: concelho,
        })) || [],
    }));
  };

  const handleDistritoChange = (selectedOptions) => {
    // Update the distritos
    setSelectedDistritos(selectedOptions);

    // Maintain the selected concelhos that belong to the new selected distritos
    const updatedConcelhos = selectedConcelhos.filter((concelho) => {
      return selectedOptions.some((distrito) =>
        concelhos[distrito.value]?.includes(concelho.value)
      );
    });

    setSelectedConcelhos(updatedConcelhos);
  };

  const handleConcelhoChange = (selectedOptions) => {
    setSelectedConcelhos(selectedOptions);
  };

  const handleSelectAllConcelhos = (distrito) => {
    // Check if the distrito value exists in concelhos
    if (!concelhos[distrito.value]) {
      return; // If not, exit early
    }

    const allConcelhos = concelhos[distrito.value].map((concelho) => ({
      value: concelho,
      label: concelho,
    }));

    setSelectedConcelhos((prevSelectedConcelhos) => {
      const existingConcelhos = new Set(
        prevSelectedConcelhos.map((c) => c.value)
      );
      const newSelections = allConcelhos.filter(
        (concelho) => !existingConcelhos.has(concelho.value)
      );
      return [...prevSelectedConcelhos, ...newSelections];
    });
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
                    id="distrito-select"
                    isMulti
                    options={distritos}
                    value={selectedDistritos}
                    onChange={handleDistritoChange}
                    closeMenuOnSelect={false}
                    placeholder="Selecionar distrito(s)"
                  />
                  {selectedDistritos.length > 0 &&
                    selectedDistritos.map((distrito) => (
                      <button
                        key={distrito.value}
                        type="button"
                        onClick={() => handleSelectAllConcelhos(distrito)}
                      >
                        Selecionar todos de {distrito.label}
                      </button>
                    ))}

                  {selectedDistritos.length > 0 && (
                    <div style={{ marginBottom: "1em" }}>
                      <Select
                        id="concelho-select"
                        isMulti
                        options={getConcelhoOptions()}
                        value={selectedConcelhos}
                        onChange={handleConcelhoChange}
                        placeholder="Selecionar concelho(s)"
                        closeMenuOnSelect={false} // Prevents closing the menu on item select
                        hideSelectedOptions={true} // Shows selected options in the dropdown
                      />
                    </div>
                  )}
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
                type={showPassword ? "text" : "password"} // Altera o tipo de input para mostrar/esconder
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.togglePasswordButton}
              >
                {showPassword ? <img src={show} /> : <img src={hide} />}
              </button>
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
                placeholder={
                  isMobile
                    ? "Inclua todos os detalhes que você acha que o profissional deve saber"
                    : "Inclua todos os detalhes que você acha que o profissional deve saber (local da alteração da parede, prazo, etc.)"
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="location">Localização</label>

              <Select
                id="distrito-select"
                isMulti
                options={distritos}
                value={selectedDistritos}
                onChange={handleDistritoChange}
                closeMenuOnSelect={false}
                placeholder="Selecionar distrito(s)"
              />
              {selectedDistritos.length > 0 &&
                selectedDistritos.map((distrito) => (
                  <button
                    key={distrito.value}
                    type="button"
                    onClick={() => handleSelectAllConcelhos(distrito)}
                  >
                    Selecionar todos de {distrito.label}
                  </button>
                ))}

              {selectedDistritos.length > 0 && (
                <div style={{ marginBottom: "1em" }}>
                  <label htmlFor="concelho-select">Concelho(s):</label>
                  <Select
                    id="concelho-select"
                    isMulti
                    options={getConcelhoOptions()}
                    value={selectedConcelhos}
                    onChange={handleConcelhoChange}
                    placeholder="Selecionar concelho(s)"
                    closeMenuOnSelect={false} // Prevents closing the menu on item select
                    hideSelectedOptions={true} // Shows selected options in the dropdown
                  />
                </div>
              )}
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
