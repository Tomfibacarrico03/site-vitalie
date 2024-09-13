import React, { useState, useEffect } from "react";
import styles from "../css/postJob.module.css";
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
import concelhos from "../lib/concelhos";

import hide from "../imgs/hideIcon.png";
import show from "../imgs/viewIcon.png";

const PostJob = () => {
  const sendEmail = httpsCallable(functions, "sendEmail");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState(null);
  const [filteredConcelhos, setFilteredConcelhos] = useState([]);
  const [selectedConcelho, setSelectedConcelho] = useState(null);

  const [termsChecked, setTermsChecked] = useState(false);

  const { createUser, user } = UserAuth();
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [tradeSelected, setTradeSelected] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [subCategoryQuestion, setSubCategoryQuestion] = useState("");
  const [subSubCategoryQuestion, setSubSubCategoryQuestion] = useState("");
  const [serviceCategory, setServiceCategory] = useState(["..."]);
  const [serviceSubCategory, setServiceSubCategory] = useState(["..."]);
  const [serviceSubSubCategory, setServiceSubSubCategory] = useState(["..."]);

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder a palavra-passe

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
    if (
      questionNumber == 7 &&
      (selectedConcelho == null || selectedDistrito == null)
    ) {
      return;
    }
    setQuestionNumber(questionNumber + 1);
  }
  async function questionDicrement() {
    setQuestionNumber(questionNumber - 1);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (termsChecked == false) {
      setError("Por favor aceite os termos e condições");
      console.log("Por favor aceite os termos e condições");
      return;
    }
    if (!selectedDistrito) {
      setError("Por favor selecione um distrito");
      return;
    }

    if (!selectedConcelho) {
      setError("Por favor selecione um concelho");
      return;
    }

    try {
      const { user } = await createUser(email, password);
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phone,
        address1: "",
        address2: "",
        city: "",
        postalCode: "",
        headline: "Some headline",
        description: "Some description",
        trade_member: false,
      });
      SaveJob(user);
      setError(null);
      navigate("/publicar-trabalho/publicado");
      await sendEmail({
        email: email,
        type: "homeowner",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const SaveJob = async (user) => {
    const newJob = {
      headline,
      description,
      userId: user.uid,
      createdAt: serverTimestamp(),
      tradeSelected,
      selectedCategory,
      selectedSubCategory,
      interestedUsers: [],
      rejectedUsers: [],
      shortlistedUsers: [],
      selectedConcelho: selectedConcelho.value,
      selectedDistrito: selectedDistrito.value,
      invitesLeft: 5,
      userHired: "",
      feedback: false,
      totalInterestedUsers: 0,
    };

    try {
      const docRef = await addDoc(collection(db, "jobs"), newJob);
      const docId = docRef.id;

      navigate(`/publicar-trabalho/${docId}/publicado`);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDistritoChange = (selectedOption) => {
    setSelectedDistrito(selectedOption); // Reset concelho when distrito changes

    setSelectedConcelho(null); // Filter concelhos based on selected distrito

    if (selectedOption) {
      setFilteredConcelhos(concelhos[selectedOption.value] || []);
    } else {
      setFilteredConcelhos([]);
    }
  };

  const handleConcelhoChange = (selectedOption) => {
    setSelectedConcelho(selectedOption);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.page}>
            
      <div className={styles.divCabecalho}>
                
        <h1 className={styles.title}>Criar Trabalho {questionNumber}</h1>
                
        <h3 className={styles.subtitle}>
                    Publica o trabalho que necessitas <br></br>e encontra o
          melhor           trabalhador para ti!         
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
            <>
                            
              <textarea className={styles.textarea} />
                          
            </>
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
            <>
                            
              <textarea
                className={styles.textarea}
                onChange={(e) => setDescription(e.target.value)}
              />
                          
            </>
          )}
                  
        </div>
                
        <div
          className={
            questionNumber === 5 ? styles.question : styles.displayNone
          }
        >
                    <h1>Qual é o título do seu trabalho?</h1>
                    
          <input
            className={styles.textareaSmall}
            onChange={(e) => setHeadline(e.target.value)}
          />
                  
        </div>
                
        <div
          className={
            questionNumber === 6 ? styles.question : styles.displayNone
          }
        >
                    <h3>Localização</h3>
                    
          <div className={styles.localizacoes}>
                        
            <Select
              className={styles.Select2}
              options={distritos}
              onChange={handleDistritoChange}
              placeholder="Distrito"
              value={selectedDistrito}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
            />
                        
            <Select
              className={styles.Select2}
              options={filteredConcelhos.map((concelho) => ({
                value: concelho,
                label: concelho,
              }))}
              onChange={handleConcelhoChange}
              placeholder="Concelho"
              value={selectedConcelho}
              isDisabled={!selectedDistrito} // Disable if no distrito is selected
            />
                      
          </div>
                  
        </div>
                
        <div
          className={
            questionNumber === 7 ? styles.question : styles.displayNone
          }
        >
                    
          {!user ? (
            <form onSubmit={handleSubmit}>
                            
              <div className={styles.formDesktop}>
                                <br></br>
                                
                <div className={styles.postJobUm}>
                                    
                  <div>
                                        
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
                                        
                    <input
                      type="text"
                      id="phone"
                      placeholder="Número de Telemóvel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                                      
                  </div>
                                    
                  <div className={styles.passContainer}>
                                        
                    <input
                      type={showPassword ? "text" : "password"} // Altera o tipo de input para mostrar/esconder
                      id="password"
                      placeholder="Palavra-passe"
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
                                  
                </div>
                                
                <div className={styles.containerTudoCheckBoxes}>
                                    
                  <div>
                                        
                    <label
                      className={styles.containerCheckBoxes}
                      htmlFor="termsChecked"
                    >
                                            Eu concordo com os{" "}
                                            
                      <a
                        href="/terms"
                        style={{ color: "#219ebc", marginLeft: 5 }}
                      >
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
                              
              </div>
                            
              <div className={styles.formMobile}>
                                
                <div>
                                    
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
                                    
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Último Nome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                                  
                </div>
                                
                <div>
                                    
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
                                    
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                                  
                </div>
                                
                <div className={styles.passContainer}>
                                    
                  <input
                    type={showPassword ? "text" : "password"} // Altera o tipo de input para mostrar/esconder
                    id="password"
                    placeholder="Palavra-passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginLeft: -10 }}
                  />
                                    
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.togglePasswordButton}
                  >
                                        
                    {showPassword ? <img src={show} /> : <img src={hide} />}
                                      
                  </button>
                                  
                </div>
                                
                <div className={styles.containerTudoCheckBoxes}>
                                    
                  <div>
                                        
                    <label
                      className={styles.containerCheckBoxes}
                      htmlFor="termsChecked"
                    >
                                            Eu concordo com os{" "}
                                            
                      <a
                        href="/terms"
                        style={{ color: "#219ebc", marginLeft: 5 }}
                      >
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
                              
              </div>
                            
              {questionNumber == 7 && (
                <button
                  className={
                    questionNumber > 1 ? styles.anteriorBtn : styles.displayNone
                  }
                  onClick={questionDicrement}
                >
                                    Anterior                 
                </button>
              )}
                            
              <button id={styles.Continuarbtn} type="submit">
                                Continuar               
              </button>
                          
            </form>
          ) : (
            <button onClick={() => SaveJob(user)}>Continuar</button>
          )}
                  
        </div>
                
        <br />
                
        {questionNumber < 7 && (
          <button
            className={
              questionNumber > 1 ? styles.anteriorBtn : styles.displayNone
            }
            onClick={questionDicrement}
          >
                        Anterior           
          </button>
        )}
                
        {questionNumber > 5 ? (
          <>
                        
            {!user ? (
              questionNumber === 7 ? null : (
                <button
                  className={styles.continueButton}
                  onClick={questionIncrement}
                >
                                    Continuar                 
                </button>
              )
            ) : (
              <button
                onClick={() => SaveJob(user)}
                className={styles.continueButton}
              >
                                Concluir               
              </button>
            )}
                      
          </>
        ) : (
          <button className={styles.continueButton} onClick={questionIncrement}>
                        Continuar           
          </button>
        )}
              
      </div>
          
    </div>
  );
};
export default PostJob;
