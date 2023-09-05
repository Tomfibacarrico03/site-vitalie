import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const LeaveReview = () => {
  const { jobId, workerId } = useParams();

  const [worker, setWorker] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewOption, setReviewOption] = useState("");
  const [reviewText, setReviewText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobAndWorkerData = async () => {
      // Fetch job data by jobId
      const jobDocRef = doc(db, "jobs", jobId);
      const jobSnapshot = await getDoc(jobDocRef);

      if (jobSnapshot.exists()) {
        const jobData = jobSnapshot.data();
        setJob(jobData);
      } else {
        console.log(`Job with ID ${jobId} not found.`);
      }

      // Fetch worker data by workerId
      const workerDocRef = doc(db, "users", workerId);
      const workerSnapshot = await getDoc(workerDocRef);

      if (workerSnapshot.exists()) {
        const workerData = workerSnapshot.data();
        setWorker(workerData);
      } else {
        console.log(`Worker with ID ${workerId} not found.`);
      }

      // Data fetching is complete, set loading to false
      setLoading(false);
    };

    fetchJobAndWorkerData();
  }, [jobId, workerId]);

  const sendReview = async () => {
    const jobDocRef = doc(db, "jobs", jobId);

    try {
      await updateDoc(jobDocRef, {
        feedback: true,
      });
      console.log("Feedback updated successfully.");
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  const reviewCard = (text, imageUrl, option) => {
    return (
      <div>
        <input
          type="checkbox"
          id="reviewCheckbox"
          name="reviewCheckbox"
          checked={reviewOption == option}
          onChange={() => setReviewOption(option)}
        />
        <h3>{text}</h3>
        {imageUrl != "" && (
          <img style={{ width: 50 }} src={imageUrl} alt="Image" />
        )}
      </div>
    );
  };
  return (
    <div>
      <h1>Deixar Crítica</h1>
      <h2>
        {worker.firstName} {worker.lastName} de {worker.workName} "
        {job.headline}"
      </h2>
      <div>
        <h3>Como é que foi a tua experiência?</h3>
        <div>
          {reviewCard(
            "Positivo",
            "https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png",
            "positive"
          )}
          {reviewCard("Neutro", "", "neutral")}
          {reviewCard(
            "Negativo",
            "https://cdn-icons-png.flaticon.com/512/126/126504.png",
            "negative"
          )}
        </div>
        <div>
          <h3>Escreve a tua crítica</h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={10}
            cols={80}
            placeholder="Escreve aqui a tua crítica..."
          />
        </div>
        <div>
          <p>
            Este feedback ficará visível no perfil de {worker.firstName}{" "}
            {worker.lastName} para outros clientes para verem. Depois de deixar
            uma crítica para um trabalhador, não poderá editá-lo. Por favor,
            certifique-se de que você está satisfeito com seu feedback antes de
            continuar.
          </p>
        </div>
        <div>
          <button onClick={() => sendReview()}>Enviar crítica</button>
          <button
            onClick={() =>
              navigate(`/meustrabalhos/${jobId}/trabalhador/${workerId}`)
            }
          >
            Eu não estou pronto para deixar uma crítica
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveReview;
