import React, { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc} from 'firebase/firestore';
import styles from "../../css/minhaconta.module.css";
import Select from "react-select";
import { trades, distritos} from '../../lib/SelectOptions'


const TradesProfile = () => {

  const { user } = UserAuth()

  const [tradesSelected, setTradesSelected] = useState([]);
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (user) {
        setTradesSelected(user.tradesSelected || '');
        setWorkName(user.workName || '');
        setDescription(user.description || '');
        setLocation(user.location || '');
    }
  }, [user]);


  const handleSave = async () => {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { 
        tradesSelected,
        workName,
        description,
        location
   });
    console.log('Updated user information saved!');
  };

  const handleSelectedOptionsChange = (set) => {
    return (selectedOptions) => {
      const values = selectedOptions.map((option) => option.label);
      set(values);
    };
  };

  

  return (
    <div className={styles.detalhesContainer}>
        <h1>Perfil de trabalhador</h1>
        <div>
            <label htmlFor="trade">Que trabalhos deseja realizar</label>
            <Select
            isMulti
            options={trades}
            value={tradesSelected.map((item) => ({ label: item, value: item }))}
            onChange={handleSelectedOptionsChange(setTradesSelected)}
            placeholder="Selecionar"
            />
        </div>
        <div>
            <label htmlFor="workName">Nome de trabalho</label>
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
            <label htmlFor="description">Descrição</label>
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
            value={location.map((item) => ({ label: item, value: item }))}
            onChange={handleSelectedOptionsChange(setLocation)}
            placeholder="Selecionar"
            />
        </div>
        <div className={styles.botoes}> 
            <button className={styles.guardar} onClick={handleSave}>Guardar</button>
        </div>
    </div>
  );
};

export default TradesProfile;
