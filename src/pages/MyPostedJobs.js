import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import JobCard from '../components/cards/JobCard';
import styles from "../css/meustrabalhos.module.css";
import Select from "react-select";


const MyPostedJobs = () => {

    const {user} = UserAuth()

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
        const q = query(collection(db, 'jobs'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const jobsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setJobs(jobsData);
        });
        return unsubscribe;
        };
        fetchJobs();
    }, [user.uid]);

   return (
    <div>
    <div className={styles.detalhesContainer}>
      <h1>Meus Trabalhos publicados</h1>
      <hr></hr>
        {jobs.map((job) => (
          <Link key={job.id} style={{textDecoration: "none"}} to={`/meustrabalhos/${job.id}` } state={{ job }}>
            <JobCard value={job}/>
          </Link>
        ))}
    </div>
    <div className={styles.contrataPessoas}>
      <header>
        <p className={styles.tituloContrataPessoas}>Contrata trabalhadores</p>
      </header>
      <p>Nós temos trabalhadores prontas para ajudarem-te. Publica um trabalho, vê as reviews e contrata hoje!</p>
      <Select
        className={styles.Select}
        placeholder="Serviço Necessário"
      />
      <br></br>
      <a href="" className={styles.btnPostJob}>Criar Trabalho</a>
    </div>
    </div>
   )
};

export default MyPostedJobs;
