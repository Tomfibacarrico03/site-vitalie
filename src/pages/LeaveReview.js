import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "../css/leavereview.module.css";

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
    const userRef = doc(db, "users", workerId);

    try {
      await updateDoc(jobDocRef, {
        feedback: true,
      });

      await updateDoc(userRef, {
        reviewCount: increment(1),
      });

      if (reviewOption == "positive") {
        await updateDoc(userRef, {
          positiveReviewCount: increment(1),
        });
      }

      const reviewsCollectionRef = collection(userRef, "reviews");

      // Add a new document to the "reviews" subcollection
      await addDoc(reviewsCollectionRef, {
        reviewText,
        reviewOption,
      });
      navigate("/meustrabalhos?reviewSubmitted=true");
      console.log("Feedback updated successfully.");
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  if (loading) {
    return (
      <h2 style={{ fontFamily: "Avenir Next", textAlign: "center" }}>
        A carregar...
      </h2>
    );
  }

  const reviewCard = (text, imageUrl, option) => {
    return (
      <div style={{ width: "97%", marginLeft: 17 }}>
        <input
          type="checkbox"
          id="reviewCheckbox"
          name="reviewCheckbox"
          checked={reviewOption == option}
          onChange={() => setReviewOption(option)}
          style={{
            width: 15,
            height: 15,
          }}
        />
        <div className={styles.reviews}>
          <p style={{ marginRight: 62, marginTop: 15 }}>{text}</p>
          {/* {imageUrl != "" && (
            <img
              style={{ width: 15, height: 15, marginLeft: 5 }}
              src={imageUrl}
              alt="Image"
            />
          )} */}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <h2>Deixar Crítica</h2>
      <h3 style={{ fontWeight: 500 }}>
        {worker.firstName} {worker.lastName} de {worker.workName} "
        {job.headline}"
      </h3>
      <div className={styles.containerSub}>
        <h3>Como é que foi a tua experiência?</h3>
        <div className={styles.tabela}>
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
