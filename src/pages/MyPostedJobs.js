import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
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
          <Link key={job.id} style={{textDecoration: "none"}} to={`/meustrabalhos/${job.id}` } state={{ job }}>
            <JobCard value={job}/>
          </Link>
        ))}
    </div>
   )
};

export default MyPostedJobs;
