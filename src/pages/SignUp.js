import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doc, setDoc, updateDoc} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext'
import { auth, db } from '../firebase';
import Select from 'react-select'
import styles from "../css/register.module.css";


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

    const [tradeSelected, setTradeSelected] = useState("")

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
            trade_member: true,
            tradeSelected,
            interestedJobs: [],

         }) 
        setError(null);
        navigate('/minha-conta')
      } catch (error) {
        setError(error.message);
      }
    };

    const becomeTradesPerson = async (e) => {
      e.preventDefault();
      try {
        await updateDoc(doc(db, "users", user.uid), {
            tradeSelected,
            trade_member: true,

         }) 
      } catch (error) {
        console.log(error.message);
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

      useEffect(() => {
        
      }, [user]);
  
    return (
        <div className={styles.register}>
        {user && user.email ? (
          <>
          {user.trade_member == false ? (
          <div>
            <h2>Bem vindo, {user.firstName} {user.lastName}</h2>
            <h3>Inscreva-se para ser um membro comercial</h3>
            <form onSubmit={becomeTradesPerson}>
                <div>
                  <label htmlFor="trade">Que trabalho deseja realizar</label>
                  <Select 
                    options={trades}
                    onChange={(option) => setTradeSelected(option.label)}
                    placeholder="Selecionar"
                  />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Registar como trabalhador</button>
            </form>
          </div>
          ):(
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
                    placeholder='First Name'
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
                    placeholder='Last Name'
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
                    placeholder='Phone Number'
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
                    placeholder='Email'
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
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div>
                  <label htmlFor="trade">Que trabalho deseja realizar</label>
                  <Select 
                    className={styles.select}
                    isMulti
                    options={trades}
                    onChange={(option) => setTradeSelected(option.label)}
                    placeholder="Selecionar"
                  />
                </div>
                <div className={styles.containerTudoCheckBoxes}>
                  <div>
                    <label className={styles.containerCheckBoxes} htmlFor="receiveTipsChecked">
                      Eu gostaria de receber notícias, conselhos e dicas do MyBuilder
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
                    
                    <label className={styles.containerCheckBoxes} htmlFor="termsChecked">
                      Eu concordo com os <a href="/terms" style={{color: "#219ebc"}}>Termos e Condições</a>.
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
              <button type="submit">Sign up</button>
            </form>
          </>
        )}
       
      </div>
    );
};

export default SignUp;
