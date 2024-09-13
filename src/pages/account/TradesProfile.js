import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import styles from "../../css/minhaconta.module.css";
import Select from "react-select";
import { trades, distritos } from "../../lib/SelectOptions";
import concelhos from "../../lib/concelhos";

const TradesProfile = () => {
  const { user } = UserAuth();

  const [tradesSelected, setTradesSelected] = useState([]);
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDistritos, setSelectedDistritos] = useState([]);
  const [selectedConcelhos, setSelectedConcelhos] = useState([]);

  useEffect(() => {
    if (user) {
      setTradesSelected(user.tradesSelected || []);
      setWorkName(user.workName || "");
      setDescription(user.description || "");

      setSelectedConcelhos(
        user.concelhos
          ? user.concelhos.map((value) => ({
              value,
              label: value,
            }))
          : []
      );

      setSelectedDistritos(
        user.distritos
          ? user.distritos.map((value) => ({
              value,
              label: value,
            }))
          : []
      );
    }
  }, [user]);

  const handleSave = async () => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      tradesSelected,
      workName,
      description,
      distritos: selectedDistritos.map((item) => item.value),
      concelhos: selectedConcelhos.map((item) => item.value),
    });
    console.log("Updated user information saved!");
  };

  const handleSelectedOptionsChange = (set) => {
    return (selectedOptions) => {
      const values = selectedOptions.map((option) => option.label);
      set(values);
    };
  };

  const getConcelhoOptions = () => {
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
    setSelectedDistritos(selectedOptions);

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
    if (!concelhos[distrito.value]) {
      return;
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
        <label htmlFor="trade">Pode adicionar mais que um trabalho</label>
      </div>
      <div>
        <br></br>
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
          id="distrito-select"
          isMulti
          options={distritos}
          value={selectedDistritos}
          onChange={handleDistritoChange}
          closeMenuOnSelect={false}
          placeholder="Selecionar distrito(s)"
        />
        <div className={styles.distritosZone}>
          {selectedDistritos.length > 0 &&
            selectedDistritos.map((distrito) => (
              <a
                key={distrito.value}
                type="button"
                onClick={() => handleSelectAllConcelhos(distrito)}
              >
                Selecionar todos de {distrito.label}
              </a>
            ))}
        </div>

        {selectedDistritos.length > 0 && (
          <Select
            id="concelho-select"
            isMulti
            options={getConcelhoOptions()}
            value={selectedConcelhos}
            onChange={handleConcelhoChange}
            placeholder="Selecionar concelho(s)"
            closeMenuOnSelect={false}
            hideSelectedOptions={true}
          />
        )}
        <label htmlFor="trade">Pode adicionar mais que uma localização</label>
      </div>
      <div className={styles.botoes}>
        <button className={styles.guardar} onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default TradesProfile;
