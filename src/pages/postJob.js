import React, { useState, useEffect } from "react";
import styles from "../css/postJob.module.css";
import paper from ".././imgs/paper.webp";
import { trades, distritos } from "../lib/SelectOptions";
import serviceCategories from "../lib/ServiceCategories";
import serviceSubCategories from "../lib/ServiceSubCategories";
import serviceSubSubCategories from "../lib/ServiceSubCategories2";
import { useNavigate } from "react-router-dom";
import { db, functions } from "../firebase";
import {
  serverTimestamp,
  setDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import Select from "react-select";
import { httpsCallable } from "firebase/functions";
const PostJob = () => {
  const saveJob = httpsCallable(functions, "SaveJob");
  const createUserAndSaveJob = httpsCallable(functions, "createUserAndSaveJob");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receiveTipsChecked, setReceiveTipsChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { createUser, user, logout } = UserAuth();
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState([]);
  const [error, setError] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  var selectedOption;
  const [tradeSelected, setTradeSelected] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [subCategoryQuestion, setSubCategoryQuestion] = useState("");
  const [subSubCategoryQuestion, setSubSubCategoryQuestion] = useState("");
  const [serviceCategory, setServiceCategory] = useState(["..."]);
  const [serviceSubCategory, setServiceSubCategory] = useState(["..."]);
  const [serviceSubSubCategory, setServiceSubSubCategory] = useState(["..."]);

  useEffect(() => {
    if (serviceSubCategory === "description") {
      setSubCategoryQuestion(
        "Coloque aqui uma descrição do trabalho que necessita."
      );
    } else {
      setSubCategoryQuestion(serviceSubCategory[0]);
    }
  }, [serviceSubCategory]);
  useEffect(() => {
    if (serviceSubSubCategory === "description") {
      setSubSubCategoryQuestion(
        "Coloque aqui uma descrição do trabalho que necessita."
      );
    } else {
      setSubSubCategoryQuestion(serviceSubSubCategory[0]);
    }
  }, [serviceSubSubCategory]);
  const handleChange = (selectedOption) => {
    setTradeSelected(selectedOption.label);
    if (serviceCategories[selectedOption.value]) {
      setServiceCategory(serviceCategories[selectedOption.value]);
    }
  };

  const handleCatergory1Change = (event) => {
    const val = event.target.value;
    setSelectedCategory(val);
    if (serviceSubCategories[val]) {
      setServiceSubCategory(serviceSubCategories[val]);
    } else {
      setServiceSubCategory("description");
      console.log("description 1");
    }
  };
  const handleSubCatergoryChange = (event) => {
    const val = event.target.value;
    setSelectedSubCategory(val);
    if (serviceSubSubCategories[val]) {
      setServiceSubSubCategory(serviceSubSubCategories[val]);
      console.log(val);
    } else {
      setServiceSubSubCategory("description");
      console.log("description 2");
    }
  };
  const handleSubSubCatergoryChange = (event) => {
    const val = event.target.value;
    setSelectedSubSubCategory(val);
    console.log(val);
  };
  function questionIncrement() {
    setQuestionNumber(questionNumber + 1);
  }
  async function questionDicrement() {
    setQuestionNumber(questionNumber - 1);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsChecked) {
      setError("Por favor aceite os termos e condições");
      return;
    }

    try {
      const { user } = await createUser(email, password);
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        email,
        phone,
        address1: "",
        address2: "",
        city: "",
        postalCode,
        headline: "Some headline",
        description: "Some description",
        location,
        trade_member: false,
      });
      SaveJob(user);
      setError(null);
      navigate("/publicar-trabalho/publicado");
    } catch (error) {
      setError(error.message);
    }
  };

  /*  const SaveJob = async (user) => {
    try {
      const dbRef = collection(db, "jobs");
      addDoc(dbRef, {
        headline: "Yest",
        description: "desccoco",
        userId: user.uid,
        createdAt: serverTimestamp(),

      })
      .then(console.log("Document has been added successfully"))
        console.log('Document Added')
    } catch (error) {
        setError(error.message);
        console.log(error.message)
          
    }
  } */

  const SaveJob = async (user) => {
    const newJob = {
      headline: "Yest",
      description: "desccoco",
      userId: user.uid,
      createdAt: serverTimestamp(),
      tradeSelected,
      selectedCategory,
      selectedSubCategory,
      //location: location.value,
      interestedUsers: [],
      rejectedUsers: [],
      shortlistedUsers: [],
      invitesLeft: 5,
    };

    try {
      const docRef = await addDoc(collection(db, "jobs"), newJob);
      const docId = docRef.id;

      navigate("/publicar-trabalho/publicado", {
        state: {
          ...newJob,
          id: docId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.paper}>
        <img src={paper} />
      </div>
      <div className={styles.divCabecalho}>
        <h1 className={styles.title}>Criar Trabalho</h1>
        <h3 className={styles.subtitle}>
          Publica o trabalho que necessitas e encontra o melhor trabalhador para
          ti!
        </h3>
      </div>

      <div className={styles.divQuestions}>
        <div
          className={
            questionNumber === 1 ? styles.question : styles.displayNone
          }
        >
          <h1>O que precisas no teu trabalhador?</h1>
          <Select
            className={styles.Select}
            options={trades}
            onChange={(option) => handleChange(option)}
            placeholder="Serviço Necessário"
          />
        </div>
        <div
          className={
            questionNumber === 2 ? styles.question : styles.displayNone
          }
        >
          <h1>Qual é a categoria do seu trabalho?</h1>
          <div>
            {serviceCategory.map((serviceCategory, index) => (
              <label
                key={index}
                className={
                  selectedCategory === serviceCategory
                    ? styles.categoryLabelSelected
                    : styles.categoryLabel
                }
              >
                <input
                  onChange={handleCatergory1Change}
                  checked={selectedCategory === serviceCategory}
                  type="checkbox"
                  value={serviceCategory}
                  className={styles.displayNone}
                />
                <h4>{serviceCategory}</h4>
              </label>
            ))}
          </div>
        </div>
        <div
          className={
            questionNumber === 3 ? styles.question : styles.displayNone
          }
        >
          <h1>{subCategoryQuestion}</h1>
          {serviceSubCategory !== "description" ? (
            <>
              {" "}
              {serviceSubCategory.map((serviceSubCategory, index) =>
                index === 0 ? null : (
                  <label
                    key={index}
                    className={
                      selectedSubCategory === serviceSubCategory
                        ? styles.categoryLabelSelected
                        : styles.categoryLabel
                    }
                  >
                    <input
                      onChange={handleSubCatergoryChange}
                      checked={selectedSubCategory === serviceSubCategory}
                      type="checkbox"
                      value={serviceSubCategory}
                      className={styles.displayNone}
                    />
                    <h4>{serviceSubCategory}</h4>
                  </label>
                )
              )}
            </>
          ) : (
            <textarea className={styles.textarea} />
          )}
        </div>
        <div
          className={
            questionNumber === 4 ? styles.question : styles.displayNone
          }
        >
          <h1>{subSubCategoryQuestion}</h1>
          {serviceSubSubCategory !== "description" ? (
            <>
              {" "}
              {serviceSubSubCategory.map((serviceSubSubCategory, index) =>
                index === 0 ? null : (
                  <label
                    key={index}
                    className={
                      selectedSubSubCategory === serviceSubSubCategory
                        ? styles.categoryLabelSelected
                        : styles.categoryLabel
                    }
                  >
                    <input
                      onChange={handleSubSubCatergoryChange}
                      checked={selectedSubSubCategory === serviceSubSubCategory}
                      type="checkbox"
                      value={serviceSubSubCategory}
                      className={styles.displayNone}
                    />
                    <h4>{serviceSubSubCategory}</h4>
                  </label>
                )
              )}
            </>
          ) : (
            <textarea className={styles.textarea} />
          )}
        </div>
        <div
          className={
            questionNumber === 5 ? styles.question : styles.displayNone
          }
        >
          <h1>Qual é o título do seu trabalho?</h1>
          <input className={styles.textareaSmall} />
        </div>
        <div
          className={
            questionNumber === 6 ? styles.question : styles.displayNone
          }
        >
          {!user ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.postJobZero}>
                <Select
                  className={styles.Select}
                  options={distritos}
                  onChange={setLocation}
                  placeholder="Localização"
                />
              </div>
              <div className={styles.postJobUm}>
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
                  {/* <label htmlFor="firstName">Primeiro Nome</label> */}
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Primeiro Nome"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  {/* <label htmlFor="lastName">Último Nome</label> */}
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Último Nome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.postJobDois}>
                <div>
                  {/* <label htmlFor="phone">Número de Telemóvel</label> */}
                  <input
                    type="text"
                    id="phone"
                    placeholder="Número de Telemóvel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  {/* <label htmlFor="username">Nome de Usuário Público</label> */}
                  <input
                    type="text"
                    id="username"
                    placeholder="Nome de Usuário Público"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  {/* <label htmlFor="password">Palavra-passe</label> */}
                  <input
                    type="password"
                    id="password"
                    placeholder="Palavra-passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.containerTudoCheckBoxes}>
                <div>
                  <label
                    className={styles.containerCheckBoxes}
                    htmlFor="receiveTipsChecked"
                  >
                    Eu gostaria de receber notícias, conselhos e dicas do
                    MyBuilder
                    <input
                      type="checkbox"
                      id="receiveTipsChecked"
                      className={styles.checkBox}
                      checked={receiveTipsChecked}
                      onChange={(e) => setReceiveTipsChecked(e.target.checked)}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
                <div>
                  <label
                    className={styles.containerCheckBoxes}
                    htmlFor="termsChecked"
                  >
                    Eu concordo com os{" "}
                    <a href="/terms" style={{ color: "#219ebc" }}>
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
              <button id={styles.Continuarbtn} type="submit">
                Continuar
              </button>
            </form>
          ) : (
            <button onClick={() => SaveJob(user)}>Continuar</button>
          )}
        </div>
        <br />
        <button
          className={
            questionNumber > 1 ? styles.continueButton : styles.displayNone
          }
          onClick={questionDicrement}
        >
          &#8592; Recuar
        </button>
        {questionNumber > 4 ? (
          <>
            {!user ? (
              <button
                className={styles.continueButton}
                onClick={questionIncrement}
              >
                Continuar &#8594;
              </button>
            ) : (
              <button
                onClick={() => SaveJob(user)}
                className={styles.continueButton}
              >
                Continuar
              </button>
            )}
          </>
        ) : (
          <button className={styles.continueButton} onClick={questionIncrement}>
            Continuar &#8594;
          </button>
        )}
      </div>
    </div>
  );
};
export default PostJob;
