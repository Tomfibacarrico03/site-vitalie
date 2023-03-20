import React, { useState, useEffect } from "react";
import styles from "../css/postJob.module.css";
import paper from ".././imgs/paper.webp";
import serviceCategories from "../lib/ServiceCategories";
import serviceSubCategories from "../lib/ServiceSubCategories";
import { Link, useNavigate } from "react-router-dom";
import { db, functions } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import Select from 'react-select'
import { httpsCallable } from "firebase/functions";
const PostJob = () => {
  const saveJob = httpsCallable(functions, "SaveJob");
  const createUserAndSaveJob = httpsCallable(functions, "createUserAndSaveJob");

  const [questionNumber, setQuestionNumber] = useState(1);
  var selectedOption;
  const [tradeSelected, setTradeSelected] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategoryQuestion, setSubCategoryQuestion] = useState("");
  const [serviceCategory, setServiceCategory] = useState(["..."]);
  const [serviceSubCategory, setServiceSubCategory] = useState(["..."]);
  useEffect(() => {
    console.log(serviceSubCategory);
    setSubCategoryQuestion(serviceSubCategory[0]);
  }, [serviceSubCategory]);

  const handleChange = (selectedOption) => {
    setTradeSelected(selectedOption.label);
    console.log(selectedOption);
  
    const categoryMapping = {
      architects: serviceCategories.architects,
      "bathroom-fitters": serviceCategories.bathroom,
      bricklayers: serviceCategories.bricklayingRepointing,
      "carpenters-and-joiners": serviceCategories.carpentryJoinery,
      "carpet-flooring-fitters": serviceCategories.carpetsLinoFlooring,
      "heating-engineers": serviceCategories.centralHeating,
      "chimney-fireplace-specialists": serviceCategories.chimneyFireplace,
      conversions: serviceCategories.conversions,
      "damp-proofing-specialists": serviceCategories.dampProofing,
      "demolition-specialists": serviceCategories.demolitionClearance,
      "driveway-specialists": serviceCategories.drivewaysPaving,
      electricians: serviceCategories.electrical,
      "extension-specialists": serviceCategories.extensions,
      "fascias-soffits-guttering-specialists":
        serviceCategories.fasciasSoffitsGuttering,
      fencers: serviceCategories.fencing,
      "landscape-gardeners": serviceCategories.gardeningLandscaping,
      "gas-engineers": serviceCategories.gasWork,
      "groundwork-and-foundations-specialists":
        serviceCategories.groundworkFoundations,
      handymen: serviceCategories.handymanCategory,
      "insulation-specialists": serviceCategories.insulationCategory,
      "kitchen-fitters": serviceCategories.kitchenFittingCategory,
      locksmiths: serviceCategories.locksmithCategory,
      "loft-conversion-specialists": serviceCategories.loftConversionsCategory,
      "new-builds-specialists": serviceCategories.newBuildCategory,
      "painters-and-decorators": serviceCategories.paintingDecoratingCategory,
      plasterers: serviceCategories.plasteringRenderingCategory,
      plumbers: serviceCategories.plumbingCategory,
      "restoration-and-refurbishment-specialists":
        serviceCategories.restorationRefurbishmentCategory,
      roofers: serviceCategories.roofingCategory,
      "security-system-installers": serviceCategories.securitySystems,
      stonemasons: serviceCategories.plumbinstonemasonryCategorygCategory,
      tilers: serviceCategories.tillingCategory,
      "tree-surgeons": serviceCategories.treeSurgeryCategory,
      "window-fitters": serviceCategories.windowsDoorFitingCategory,
    };
  
    setServiceCategory(categoryMapping[selectedOption.value]);
  };
  

  const handleCatergoryChange = (event) => {
    const val = event.target.value;
    setSelectedCategory(val);
    console.log(val);
    const subCategoryMapping = {
      "Conceitos fundamentais de design (para gerar orçamentos e apresentar pedidos de planejamento)":serviceSubCategories.architectsSub,
      "Plantas detalhadas em conformidade (para construtores e regulamentos de construção)":serviceSubCategories.architectsSub,
      "Renovação / instalação de banheiro":serviceSubCategories.bathroomRefurbishmentInstallationSub,
      "Instalar ou substituir um dispositivo":serviceSubCategories.bathroomInstallReplaceFixture,
      "Reparar":serviceSubCategories.bathroomRepair,
      "Azulejos":serviceSubCategories.bathroomTilling,
      "Construindo uma parede":serviceSubCategories.bricklayingBuildingWall,
      "Construção de uma estrutura":serviceSubCategories.bricklayingBuildStructure
    }
    switch (val) {
      case "Construção de uma estrutura":
        setServiceSubCategory(serviceSubCategories.bricklayingBuildStructure);
        break;
      case "Trabalho de alvenaria personalizado":
        setServiceSubCategory(
          serviceSubCategories.bricklayingBuildingBrickWork
        );
        break;
      case "Alterações na parede":
        setServiceSubCategory(serviceSubCategories.bricklayingWallAlterations);
        break;
      case "Reapontamento":
        setServiceSubCategory(serviceSubCategories.bricklayingRepointing);
        break;
      case "Trabalho na chaminé":
        setServiceSubCategory(serviceSubCategories.bricklayingChimney);
        break;
      case "Reparos":
        setServiceSubCategory(serviceSubCategories.bricklayingRepair);
        break;
      case "Portas, janelas e pisos":
        setServiceSubCategory(serviceSubCategories.carpentryJoinerySub);
        break;
      case "Fabricação, montagem e reparos de móveis":
        setServiceSubCategory(serviceSubCategories.carpentryFurniture);
        break;
      case "Unidades de cozinha e bancadas":
        setServiceSubCategory(serviceSubCategories.carpentryKitchenUnits);
        break;
      case "Área coberta":
        setServiceSubCategory(serviceSubCategories.carpentryDecking);
        break;
      case "Piso novo ou substituição":
        setServiceSubCategory(serviceSubCategories.carpetsFloring);
        break;
      case "Lixamento / restauração":
        setServiceSubCategory(serviceSubCategories.carpetsSanding);
        break;
      case "Reparo / ajuste":
        setServiceSubCategory(serviceSubCategories.carpetsRepair);
        break;
      case "Caldeira":
        setServiceSubCategory(serviceSubCategories.heatingBoiler);
        break;
      case "Tubulação / fornecimento":
        setServiceSubCategory(serviceSubCategories.heatingPipes);
        break;
      case "Radiadores":
        setServiceSubCategory(serviceSubCategories.heatingRaditors);
        break;
      case "Aquecimento de piso":
        setServiceSubCategory(serviceSubCategories.heatingUnderFloor);
        break;
      case "Instalação completa do sistema":
        setServiceSubCategory(serviceSubCategories.heatingFullSystem);
        break;
      case "Chaminé":
        setServiceSubCategory(serviceSubCategories.chimneyFireChimney);
        break;
      case "Lareira":
        setServiceSubCategory(serviceSubCategories.chimneyFireFireplace);
        break;
      case "Conversão de sotão":
        setServiceSubCategory(serviceSubCategories.consversionLoft);
        break;
      case "Conversão de um espaço existente":
        setServiceSubCategory(serviceSubCategories.conversionExistingSpace);
        break;
      case "Alteração de paredes":
        setServiceSubCategory(serviceSubCategories.conversionWall);
        break;
      case "Restaurar ou melhorar um espaço existente":
        setServiceSubCategory(
          serviceSubCategories.conversionRestoringImproving
        );
        break;
      case "Sim - Preciso apenas de ajuda para resolver o problema":
        setServiceSubCategory(serviceSubCategories.DampProofingYes);
        break;
      case "Remoção de lixo apenas":
        setServiceSubCategory(serviceSubCategories.DemoltionClearWaste);
        break;
      case "Demolição de edifícios / estruturas":
        setServiceSubCategory(serviceSubCategories.DemoltionClearBuilding);
        break;
      case "Derrubar uma parede":
        setServiceSubCategory(serviceSubCategories.DemolitionClearKnock);
        break;
      case "Instalar / Reparar uma entrada":
        setServiceSubCategory(serviceSubCategories.drivewaysPavingInstallRepair);
        break;
      case "Pavimentação, pátios e caminho":
        setServiceSubCategory(serviceSubCategories.drivewaysPavingPaving);
        break;
      //CONTINUAR ELETRICAL COMPLETO LINHA 72 CATEGORIES E LINHA 237 SUBCATEGORIES
      default:
        setServiceSubCategory(["description"]);
        break;
    }
  };
  const handleSubCatergoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
    console.log(setSelectedSubCategory);
  };
  function questionIncrement() {
    setQuestionNumber(questionNumber + 1);
  }
  async function questionDicrement() {
    setQuestionNumber(questionNumber - 1);
  }

  const navigate = useNavigate();

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

  const [error, setError] = useState(null);



      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!termsChecked) {
          setError('Please accept the terms and conditions');
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
    
            })
          SaveJob(user) 
          setError(null);
          navigate('/minha-conta')
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
    try {
      console.log("===")
      console.log(selectedCategory)
      console.log(selectedSubCategory)
      console.log("===")

      //setIsLoading(true);

      //const saveJob = functions.httpsCallable("SaveJob");
      //const { data: response } = await saveJob(
      await saveJob({
        headline: "Yest",
        description: "desccoco",
        userId: user.uid,
        createdAt: serverTimestamp(),
        tradeSelected,
        selectedCategory,
        selectedSubCategory,
      });

      // setResult(response);
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
      //setIsLoading(false);
    }
  };

  const trades = [
    { value: "architects", label: "Serviços de Arquitetura" },
    { value: "bathroom-fitters", label: "Instalação de Banheiros" },
    { value: "bricklayers", label: "Alvenaria & Rejuntamento" },
    { value: "carpenters-and-joiners", label: "Carpintaria & Marcenaria" },
    { value: "carpet-flooring-fitters", label: "Carpetes, Lino & Pisos" },
    { value: "heating-engineers", label: "Aquecimento Central" },
    { value: "chimney-fireplace-specialists", label: "Chaminé & Lareira" },
    { value: "conversions", label: "Conversões" },
    { value: "damp-proofing-specialists", label: "Prova de Umidade" },
    { value: "demolition-specialists", label: "Demolição & Limpeza" },
    { value: "driveway-specialists", label: "Entradas & Paving" },
    { value: "electricians", label: "Elétrica" },
    { value: "extension-specialists", label: "Ampliações" },
    { value: "fascias-soffits-guttering-specialists", label: "Fascias, Soffits & Calhas" },
    { value: "fencers", label: "Cercas" },
    { value: "landscape-gardeners", label: "Jardinagem & Paisagismo" },
    { value: "gas-engineers", label: "Gás" },
    { value: "groundwork-and-foundations-specialists", label: "Terraplenagem & Fundações" },
    { value: "handymen", label: "Faz-tudo" },
    { value: "insulation-specialists", label: "Isolamento" },
    { value: "kitchen-fitters", label: "Instalação de Cozinhas" },
    { value: "locksmiths", label: "Chaveiro" },
    { value: "loft-conversion-specialists", label: "Conversão de Sótão" },
    { value: "new-builds-specialists", label: "Nova Construção" },
    { value: "painters-and-decorators", label: "Pintura & Decoração" },
    { value: "plasterers", label: "Gesso & Revestimento" },
    { value: "plumbers", label: "Encanamento" },
    { value: "restoration-and-refurbishment-specialists", label: "Restauração & Renovação" },
    { value: "roofers", label: "Telhados" },
    { value: "security-system-installers", label: "Sistemas de Segurança" },
    { value: "stonemasons", label: "Pedreiro" },
    { value: "tilers", label: "Azulejista" },
    { value: "tree-surgeons", label: "Cirurgia de Árvores" },
    { value: "window-fitters", label: "Instalação de Janelas & Portas" },
  ]

  return (
    <div>
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
            options={trades}
            onChange={(option) => handleChange(option)}
            placeholder="Selecionar"
          />
        </div>
        <div
          className={
            questionNumber === 2 ? styles.question : styles.displayNone
          }
        >
          <h1>Qual é a categoria do seu trabalho?</h1>
          {serviceCategory.map((serviceCategory, index) => (
            <label
              className={
                selectedCategory === serviceCategory
                  ? styles.categoryLabelSelected
                  : styles.categoryLabel
              }
            >
              <input
                onChange={handleCatergoryChange}
                checked={selectedCategory === serviceCategory}
                type="checkbox"
                value={serviceCategory}
                className={styles.displayNone}
              />
              <h4>{serviceCategory}</h4>
            </label>
          ))}
        </div>
        <div
          className={
            questionNumber === 3 ? styles.question : styles.displayNone
          }
        >
          <h1>{subCategoryQuestion}</h1>
          {serviceSubCategory.map((serviceSubCategory, index) =>
            index === 0 ? null : (
              <label
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
        </div>
        <br />
        <button
          className={
            questionNumber > 1 ? styles.continueButton : styles.displayNone
          }
          onClick={questionDicrement}
        >
          &#8592; Back
        </button>
        <button className={styles.continueButton} onClick={questionIncrement}>
          Continue &#8594;
        </button>
        {!user ? (
          <form onSubmit={handleSubmit}>
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
                Eu concordo com os <a href="/terms">Termos e Condições</a>.
              </label>
            </div>
            {error && <p>{error}</p>}
            <button id={styles.Continuarbtn} type="submit">Continuar</button>
          </form>
        ) : (
          <button onClick={() => SaveJob(user)}>Continuar</button>
        )}
      </div>
    </div>
  );
};

export default PostJob;
