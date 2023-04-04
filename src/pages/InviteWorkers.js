import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import WorkerCard from "../components/cards/WorkerCard";


const InviteWorkers = () => {

    const [workers, setWorkers] = useState([]);

    const fetchWorkers = async () => {
        const workersRef = collection(db, "users");
        const q = query(workersRef, where("trade_member", "==", true));
        const querySnapshot = await getDocs(q);
        const fetchedWorkers = [];
        querySnapshot.forEach((doc) => {
          fetchedWorkers.push({ id: doc.id, ...doc.data() });
        });
        setWorkers(fetchedWorkers);
      };

    useEffect(() => {
        fetchWorkers();
      }, []);

    return (
      <div>
        <h1>Convide trabalhadores para entrar em contato mais rapidamente</h1>
        <h5>Notificamos os trabalhadores sobre seu trabalho, mas também pode convidar os profissionais de comércio por conta própria. Se eles aceitarem, entrarão em contato para discutir as cotações.</h5>
        <h4>Procure especialistas perto de ti</h4>
        <p>Procure especialistas em conversão perto de si, leia os perfis e contacte-os, convidando-os a fazer uma cotação.</p>
        {workers.map((worker) => (
       
            <WorkerCard value={worker}/>

        ))}
      </div>
    );
};

export default InviteWorkers;
