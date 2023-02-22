import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { collection, query, where, onSnapshot,  doc, getDoc  } from 'firebase/firestore';
import { auth, db } from '../firebase';
import JobCard from '../components/cards/JobCard';


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
      <h1>Meus Trabalhos publicados</h1>

        {jobs.map((job) => (
          <JobCard key={job.id} value={job}/>
        ))}
    </div>
   )
};

export default MyPostedJobs;
