import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import InterestedUserCard from "../components/cards/InterestedUserCard";
function JobPage(props) {

  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const { user } = UserAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [usuario, setUsuario] = useState(null);

  const [images, setImages] = useState([]);

  const handleImageUpload = async (file, index) => {
    const storageRef = ref(
      storage,
      `images/${user.uid}/${job.id}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = downloadUrl;
      return newImages;
    });
    const imageDocRef = doc(db, "jobs", job.id);
    await updateDoc(imageDocRef, { [`image${index + 1}`]: downloadUrl });
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    handleImageUpload(file, index);
  };

  const [interestedUsers, setInterestedUsers] = useState([]);

  const fetchInterestedUsers = async () => {
    if (!job) return;
    const interestedUserIds = job.interestedUsers; // get the interested users' uids from the document
    console.log(job.interestedUsers)

    const interestedUsersInfo = [];

    // loop through each interested user's uid and get their info from the users collection
    for (const userId of interestedUserIds) {
      const userRef = doc(collection(db, "users"), userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const interestedUserInfo = { id: userId, ...userData };
      interestedUsersInfo.push(interestedUserInfo);
    }

    setInterestedUsers(interestedUsersInfo); // set the interestedUsers state with the fetched data
  };


  


  const fetchJob = async () => {
    const jobDoc = await getDoc(doc(db, "jobs", jobId));
    if (jobDoc.exists()) {
      setJob({ ...jobDoc.data(), id: jobDoc.id });
      setImages([
        jobDoc.data().image1 || "",
        jobDoc.data().image2 || "",
        jobDoc.data().image3 || "",
        jobDoc.data().image4 || "",
        jobDoc.data().image5 || "",
        jobDoc.data().image6 || "",
      ]);
    } else {
      console.log("No job found");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJob();
    /* fetchUserData()
    fetchInterestedUsers() */
    
  }, [jobId]);

  useEffect(() => {
    
    fetchUserData()
    fetchInterestedUsers()
    
  }, [job]);

  const fetchUserData = async () => {
    if (!job) return;
    console.log("userid:" + job.userId)
    const userDoc = await getDoc(doc(db, "users", job.userId));
    const userData = userDoc.data();
    setUsuario(userData);
  };

  

  function createChat() {
    const chatDocId = `${user.uid}_${job.userId}`;
    const chatDocRef = doc(collection(db, "chats"), "2");
    const messagesCollectionRef = collection(chatDocRef, "messages");

    const newChatDocData = {
      users: [user.uid, job.userId],
    };

    setDoc(chatDocRef, newChatDocData)
      .then(() => {
        console.log("Chat document created successfully!");

        const newMessageDocData = {
          text: "Hello!",
          senderId: user.uid,
          timestamp: serverTimestamp(),
        };

        setDoc(doc(messagesCollectionRef), newMessageDocData)
          .then(() => {
            console.log("Message document created successfully!");
            navigate("/inbox");
          })
          .catch((error) => {
            console.error("Error creating message document:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating chat document:", error);
      });
  }

  function ShowInterest() {
    const jobRef = doc(db, "jobs", job.id);
    updateDoc(jobRef, {
      interestedUsers: arrayUnion(user.uid),
    })
      .then(() => {
        console.log('User added to "interested" array');
        const userJobRef = doc(db, "users", user.uid);
        updateDoc(userJobRef, {
          interestedJobs: arrayUnion(job.id),
        })
          .then(() => {
            console.log('Job added to "interested" field in user doc');
          })
          .catch((error) => {
            console.error(
              'Error adding job to "interested" field in user doc:',
              error
            );
          });
      })
      .catch((error) => {
        console.error('Error adding user to "interested" array:', error);
      });
  }

 

  if (loading) {
    return <div>Carregando...</div>;
  }
  
  


  

  return (
    <div style={{marginLeft: 760}}>
      <p>Location: Lisboa</p>
      <p>Trabalho: {job.tradeSelected}</p>
      <p>
        Postado {formatDistanceToNow(new Date(job.createdAt.seconds * 1000), {
          addSuffix: true,
          locale: pt,
        })}
      </p>
      {usuario && <p>Postado por: {usuario.firstName}</p>}
      {user.uid == job.userId ? (
        <p>0 pré-selecionados de 4 interessados</p>
      ) : (
        <>
          {user.interestedJobs.includes(job.id) ? (
            <p>Interessado</p>
          ) : (
            <button onClick={() => ShowInterest()}>Mostrar Interesse</button>
          )}
        </>
      )}

      <h5>Descrição do trabalho</h5>
      <p>{job.selectedSubCategory}: {job.selectedCategory}</p>
      <h5>Descrição do cliente</h5>
      <p>Descrição</p>
      <div>
        <h2>Images</h2>
        {images.map((imageUrl, index) => (
          <div key={index}>
            {user.uid === job.userId && (
              <input
                type="file"
                onChange={(event) => handleImageChange(event, index)}
              />
            )}
            {imageUrl && <img style={{ width: 50 }} src={imageUrl} alt="" />}
          </div>
        ))}
      </div>
      {user.uid == job.userId ? (
        <div>
          {interestedUsers.length > 0 ? (
            <>
            {interestedUsers.map((user) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/trabalhador/${user.id}`}
                state={{ user, job }}
              >
                <InterestedUserCard key={user.id} value={user} />
              </Link>
            ))}
            </>
          ):(
            <div>
              <p>Os trabalhadores interessados no seu trabalho aparecerão aqui.</p>
              <h5>Esperando mais trabalhadores...</h5>
            </div>
          )}
          
        </div>
      ) : null}
    </div>
  );
}

export default JobPage;
