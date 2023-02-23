import React, { useState } from "react";
import styles from "../css/postJob.module.css";
import paper from ".././imgs/paper.webp";
import serviceCategories from "../lib/ServiceCategories";
import { Link, useNavigate } from 'react-router-dom'
import { db, functions } from "../firebase";
import { collection, addDoc, serverTimestamp,setDoc, doc} from 'firebase/firestore';
import { UserAuth } from "../context/AuthContext";

import { httpsCallable } from "firebase/functions";
const PostJob = () => {
  const saveJob = httpsCallable(functions, 'SaveJob');
  const createUserAndSaveJob = httpsCallable(functions, 'createUserAndSaveJob');



  const [questionNumber, setQuestionNumber] = useState(1);
  var selectedOption;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [serviceCategory, setServiceCategory] = useState(["..."]);


  

  const handleChange = (event) => {
    selectedOption = event.target.value;
    console.log(selectedOption);

    switch (selectedOption) {
      case "architects":
        setServiceCategory(serviceCategories.architects);
        console.log(serviceCategory);
        break;

      case "bathroom-fitters":
        setServiceCategory(serviceCategories.bathroom);
        console.log(serviceCategory);
        break;
      case "bricklayers":
        setServiceCategory(serviceCategories.bricklayingRepointing);
        console.log(serviceCategory);
        break;
      case "carpenters-and-joiners":
        setServiceCategory(serviceCategories.carpentryJoinery);
        console.log(serviceCategory);
        break;
      case "carpet-flooring-fitters":
        setServiceCategory(serviceCategories.carpetsLinoFlooring);
        console.log(serviceCategory);
        break;
      case "heating-engineers":
        setServiceCategory(serviceCategories.centralHeating);
        break;
      case "chimney-fireplace-specialists":
        setServiceCategory(serviceCategories.chimneyFireplace);
        break;
      case "conservatories-specialists":
        setServiceCategory(serviceCategories.conservatories);
        break;
      case "damp-proofing-specialists":
        setServiceCategory(serviceCategories.dampProofing);
        break;
      case "demolition-specialists":
        setServiceCategory(serviceCategories.demolitionClearance);
        break;
      case "driveway-specialists":
        setServiceCategory(serviceCategories.drivewaysPaving);
        break;
      case "electricians":
        setServiceCategory(serviceCategories.electrical);
        break;
      case "extension-specialists":
        setServiceCategory(serviceCategories.extensions);
        break;
      case "fascias-soffits-guttering-specialists":
        setServiceCategory(serviceCategories.fasciasSoffitsGuttering);
        break;
      case "fencers":
        setServiceCategory(serviceCategories.fencing);
        break;
      case "landscape-gardeners":
        setServiceCategory(serviceCategories.gardeningLandscaping);
        break;
      case "gas-engineers":
        setServiceCategory(serviceCategories.gasWork);
        break;
      case "groundwork-and-foundations-specialists":
        setServiceCategory(serviceCategories.groundworkFoundations);
        break;
      case "handymen":
        setServiceCategory(serviceCategories.handymanCategory);
        break;
      case "insulation-specialists":
        setServiceCategory(serviceCategories.insulationCategory);
        break;
      case "kitchen-fitters":
        setServiceCategory(serviceCategories.kitchenFittingCategory);
        break;
      case "locksmiths":
        setServiceCategory(serviceCategories.locksmithCategory);
        break;
      case "loft-conversion-specialists":
        setServiceCategory(serviceCategories.loftConversionsCategory);
        break;
      case "new-builds-specialists":
        setServiceCategory(serviceCategories.newBuildCategory);
        break;
      case "painters-and-decorators":
        setServiceCategory(serviceCategories.paintingDecoratingCategory);
        break;
      case "plasterers":
        setServiceCategory(serviceCategories.plasteringRenderingCategory);
        break;
      case "plumbers":
        setServiceCategory(serviceCategories.plumbingCategory);
        break;
      case "restoration-and-refurbishment-specialists":
        setServiceCategory(serviceCategories.restorationRefurbishmentCategory);
        break;
      case "roofers":
        setServiceCategory(serviceCategories.roofingCategory);
        break;
      case "security-system-installers":
        setServiceCategory(serviceCategories.securitySystems);
        break;
      case "stonemasons":
        setServiceCategory(
          serviceCategories.plumbinstonemasonryCategorygCategory
        );
        break;
      case "tilers":
        setServiceCategory(serviceCategories.tillingCategory);
        break;
      case "tree-surgeons":
        setServiceCategory(serviceCategories.treeSurgeryCategory);
        break;
      case "window-fitters":
        setServiceCategory(serviceCategories.windowsDoorFitingCategory);
        break;
      default:
        break;
    }
  };
  const handleCatergoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  function questionIncrement() {
    setQuestionNumber(questionNumber + 1);
  }
  async function questionDicrement() {
    setQuestionNumber(questionNumber - 1);
  }

  
  const navigate = useNavigate()
    
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [receiveTipsChecked, setReceiveTipsChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const { createUser, user, logout } = UserAuth();
  const [headline, setHeadline] = useState("")
  const [description, setDescription] = useState("")

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!termsChecked) {
      setError('Please accept the terms and conditions');
      return;
    }
  
    try {
      const result = await createUserAndSaveJob({
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        postalCode,
        headline: 'Some headline',
        description: 'Some description'
      });
  
      console.log(result.data.message); // Output: "User created successfully and job saved!"
      setError(null);
      navigate('/minha-conta');
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
      //setIsLoading(true);

      //const saveJob = functions.httpsCallable("SaveJob");
      //const { data: response } = await saveJob(
        await saveJob(
        {
          headline: "Yest",
          description: "desccoco",
          userId: user.uid,
          createdAt: serverTimestamp(),
  
        }
      );

     // setResult(response);
     // setIsLoading(false);
    } catch (error) {
      console.error(error);
      //setIsLoading(false);
    }
  }
  
  return (
    <div>
      <div className={styles.paper}>
        <img src={paper} />
      </div>
      <div className={styles.divCabecalho}>
        <h1 className={styles.title}>Post a job</h1>
        <h3 className={styles.subtitle}>
          Get your job out there and find the right tradesperson for you!
        </h3>
      </div>

      <div className={styles.divQuestions}>
        <div
          className={
            questionNumber === 1 ? styles.question : styles.displayNone
          }
        >
          <h1>What do you need your tradesperson for?</h1>
          <select
            className={styles.jobsSelect}
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="">Choose a trade category</option>
            <option value="architects">Architectural Services</option>
            <option value="bathroom-fitters">Bathroom Fitting</option>
            <option value="bricklayers">Bricklaying &amp; Repointing</option>
            <option value="carpenters-and-joiners">
              Carpentry &amp; Joinery
            </option>
            <option value="carpet-flooring-fitters">
              Carpets, Lino &amp; Flooring
            </option>
            <option value="heating-engineers">Central Heating</option>
            <option value="chimney-fireplace-specialists">
              Chimney &amp; Fireplace
            </option>
            <option value="conservatories-specialists">Conservatories</option>
            <option value="conversions">Conversions</option>
            <option value="damp-proofing-specialists">Damp Proofing</option>
            <option value="demolition-specialists">
              Demolition &amp; Clearance
            </option>
            <option value="driveway-specialists">Driveways &amp; Paving</option>
            <option value="electricians">Electrical</option>
            <option value="extension-specialists">Extensions</option>
            <option value="fascias-soffits-guttering-specialists">
              Fascias, Soffits &amp; Guttering
            </option>
            <option value="fencers">Fencing</option>
            <option value="landscape-gardeners">
              Gardening &amp; Landscaping
            </option>
            <option value="gas-engineers">Gas Work</option>
            <option value="groundwork-and-foundations-specialists">
              Groundwork &amp; Foundations
            </option>
            <option value="handymen">Handyman</option>
            <option value="insulation-specialists">Insulation</option>
            <option value="kitchen-fitters">Kitchen Fitting</option>
            <option value="locksmiths">Locksmith</option>
            <option value="loft-conversion-specialists">
              Loft Conversions
            </option>
            <option value="new-builds-specialists">New Build</option>
            <option value="painters-and-decorators">
              Painting &amp; Decorating
            </option>
            <option value="plasterers">Plastering &amp; Rendering</option>
            <option value="plumbers">Plumbing</option>
            <option value="restoration-and-refurbishment-specialists">
              Restoration &amp; Refurbishment
            </option>
            <option value="roofers">Roofing</option>
            <option value="security-system-installers">Security Systems</option>
            <option value="stonemasons">Stonemasonry</option>
            <option value="tilers">Tiling</option>
            <option value="tree-surgeons">Tree Surgery</option>
            <option value="window-fitters">Windows &amp; Door Fitting</option>
            <option value="not-determined">I'm not sure which to pick</option>
          </select>
        </div>
        <div
          className={
            questionNumber === 2 ? styles.question : styles.displayNone
          }
        >
          <h1>What category of {selectedOption} are you in need of?</h1>
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
        { !user ? (
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="firstName">Primeiro nome</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="lastName">Último nome</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="phone">Número de telemóvel</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                </div>
                <div>
                  <label htmlFor="username">Nome de usuário público</label>
                  <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                  />
                </div>
                
                <div>
                    <label htmlFor="password">Palavara-passe</label>
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
              <button type="submit">Continuar</button>
            </form>):(<button onClick={() => SaveJob(user)}>Continuar</button>)}
      </div>
    </div>
  );
};

export default PostJob;
