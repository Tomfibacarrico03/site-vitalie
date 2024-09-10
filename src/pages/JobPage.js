import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import InterestedUserCard from "../components/cards/InterestedUserCard";
import styles from "../css/jobPage.module.css";
import { servicesData } from "../lib/taxes";

function JobPage(props) {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const { user } = UserAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [usuario, setUsuario] = useState(null);

  const [images, setImages] = useState([]);

  const [confirmationBanner, setConfirmationBanner] = useState(false);

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
    console.log(job.interestedUsers);

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

  const [hiredUser, setHiredUser] = useState(null);

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

      const userHired = jobDoc.data().userHired;

      if (userHired !== "") {
        // Check if userHired is not empty
        const userHiredDoc = await getDoc(doc(db, "users", userHired));

        if (userHiredDoc.exists()) {
          setHiredUser({ ...userHiredDoc.data(), id: userHiredDoc.id });
        } else {
          console.log("UserHired not found");
        }
      }
    } else {
      console.log("No job found");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  useEffect(() => {
    fetchUserData();
    fetchInterestedUsers();
  }, [job]);

  const fetchUserData = async () => {
    if (!job) return;
    console.log("userid:" + job.userId);
    const userDoc = await getDoc(doc(db, "users", job.userId));
    const userData = userDoc.data();
    setUsuario(userData);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];

    updatedImages[index] = null;

    setImages(updatedImages);
  };

  function ShowInterest() {
    const jobRef = doc(db, "jobs", job.id);

    updateDoc(jobRef, {
      interestedUsers: arrayUnion(user.uid),
      totalInterestedUsers: increment(1),
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

    setConfirmationBanner(false);
  }

  function RemoveInterest() {
    const jobRef = doc(db, "jobs", job.id);
    updateDoc(jobRef, {
      interestedUsers: arrayRemove(user.uid),
      totalInterestedUsers: increment(-1),
    });

    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, {
      interestedJobs: arrayRemove(job.id),
    });
  }

  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    <div className={styles.postTrabalho}>
      {confirmationBanner ? (
        <div className={styles.confirmationbanner}>
          <div className={styles.confirmationcard}>
            {user.credits &&
            user.credits >
              servicesData[job.tradeSelected][job.selectedCategory] ? (
              `Compreende que ao proseguir, caso seja adicionado como possível trabalhador, serão debitados ${
                servicesData[job.tradeSelected][job.selectedCategory]
              } créditos`
            ) : (
              <>
                <p>
                  Créditos insuficientes. Precisa de{" "}
                  {servicesData[job.tradeSelected][job.selectedCategory]}{" "}
                  créditos
                </p>
                <p>Pode adquirir mais em Minha Conta {">"} Créditos</p>
              </>
            )}
            <div className={styles.confirmationbuttons}>
              <button
                className={styles.confirmationno}
                onClick={() => setConfirmationBanner(false)}
              >
                {user.credits &&
                user.credits >
                  servicesData[job.tradeSelected][job.selectedCategory]
                  ? "Não"
                  : "Ok"}
              </button>
              {user.credits &&
                user.credits >
                  servicesData[job.tradeSelected][job.selectedCategory] && (
                  <button
                    className={styles.confirmationyes}
                    onClick={() => ShowInterest()}
                  >
                    Sim
                  </button>
                )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.postTrabalhoEsq}>
        <div className={styles.infoTrabalho}>
          <header>
            <div className={styles.infoTextos}>
              <p>Localização</p>
              <p>Trabalho</p>
              <p>Postado</p>
              <p>Postado por</p>
            </div>
            <div className={styles.infoInfo}>
              <p>Lisboa</p>
              <p>{job.tradeSelected}</p>
              <p>
                {formatDistanceToNow(new Date(job.createdAt.seconds * 1000), {
                  addSuffix: true,
                  locale: pt,
                })}
              </p>
              {usuario && (
                <p className={styles.infoNome}>{usuario.firstName}</p>
              )}
            </div>
          </header>
        </div>
        {job.userHired == "" && (
          <div className={styles.interessados}>
            {user.uid == job.userId ? (
              <p>
                {job.shortlistedUsers.length} pré-selecionados de{" "}
                {job.totalInterestedUsers} interessados
              </p>
            ) : (
              <>
                {user.interestedJobs.includes(job.id) &&
                !user.shortlistedJobs.includes(job.id) ? (
                  <>
                    <p
                      style={{
                        marginTop: 10,
                        marginLeft: -10,
                        marginBottom: 10,
                        fontFamily: "Raleway",
                      }}
                    >
                      Interessado
                    </p>
                    <button
                      style={{
                        marginTop: 0,
                        marginLeft: -15,
                        padding: 15,
                        fontFamily: "Raleway",
                      }}
                      onClick={() => RemoveInterest()}
                    >
                      Remover interesse
                    </button>
                  </>
                ) : (
                  <>
                    {user.shortlistedJobs.includes(job.id) ? (
                      <>
                        {usuario && (
                          <>
                            <p className={styles.infoNome}>
                              Foste adicionado a lista restrita. Liga para
                              fechar o negócio
                            </p>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: -15,
                                marginTop: -25,
                              }}
                            >
                              <img
                                style={{
                                  width: 13,
                                  height: 13,
                                  marginRight: 5,
                                  marginTop: -20,
                                }}
                                src={require("../imgs/phoneVitalie.png")}
                              />
                              <p style={{ color: "#508ce4" }}>
                                {usuario.phone}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <button
                        style={{
                          marginTop: 0,
                          marginLeft: -15,
                          padding: 15,
                          fontFamily: "Raleway",
                          boxShadow: "0 0 10px 3px #508ce4",
                          backgroundColor: "#fff",
                          color: "#508ce4",
                          marginBottom: 7,
                          cursor: "pointer",
                        }}
                        onClick={() => setConfirmationBanner(true)}
                      >
                        Mostrar Interesse
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        <div className={styles.descricoesTrabalho}>
          <h3>Descrição do trabalho</h3>
          <p>
            {job.selectedSubCategory}: {job.selectedCategory}
          </p>
          <h3>Descrição do cliente</h3>
          <p>{job.description}</p>
          <div>
            <h3>Imagens</h3>
            <div className={styles.postImagens}>
              <div className={styles.postImagesScroll}>
                {images.map((imageUrl, index) => (
                  <div key={index}>
                    {user.uid === job.userId && (
                      <button
                        onClick={() => {
                          document.getElementById(`input-${index}`).click();
                        }}
                        style={{ display: imageUrl ? "none" : "block" }}
                      >
                        +
                      </button>
                    )}
                    <input
                      id={`input-${index}`}
                      type="file"
                      onChange={(event) => handleImageChange(event, index)}
                      style={{ display: "none" }}
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        style={{
                          borderRadius: 5,
                          marginTop: 10,
                          width: "auto",
                          marginRight: 15,
                          cursor: "pointer", // Add a pointer cursor to indicate it's clickable
                        }}
                        alt=""
                        onClick={() => removeImage(index)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.criticasConvites}>
        {user.uid == job.userId ? (
          <div className={styles.criticas}>
            <>
              {job.userHired == "" ? (
                <div>
                  <h3>Trabalhadores interessados</h3>
                  {interestedUsers.length > 0 ? (
                    <>
                      {interestedUsers.map((user) => (
                        <Link
                          to={`/meustrabalhos/${jobId}/trabalhador/${user.id}`}
                          state={{ user, job }}
                        >
                          <InterestedUserCard key={user.id} value={user} />
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div>
                      <p style={{ marginLeft: -5 }}>
                        Os trabalhadores interessados no seu trabalho aparecerão
                        aqui.
                      </p>
                      <h5 style={{ fontFamily: "Raleway" }}>
                        Esperando mais trabalhadores...
                      </h5>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3>Trabalhador contratado</h3>
                  <Link
                    to={`/meustrabalhos/${jobId}/trabalhador/${hiredUser.id}`}
                  >
                    <h5
                      style={{
                        marginLeft: 3,
                        backgroundColor: "#333",
                        padding: 5,
                        textAlign: "left",
                        color: "#fff",
                        borderRadius: 5,
                      }}
                    >
                      {hiredUser.workName}
                    </h5>
                  </Link>
                  <p style={{ fontSize: 14, marginTop: -15 }}>
                    {hiredUser.reviewCount} crítica(s) 👍🏻{" "}
                    {hiredUser.reviewCount !== 0 ? (
                      <>
                        {(hiredUser.positiveReviewCount /
                          hiredUser.reviewCount) *
                          100}{" "}
                        %
                      </>
                    ) : (
                      "Ainda sem críticas"
                    )}
                  </p>
                </div>
              )}
            </>
          </div>
        ) : null}
        <br></br>
        {job.userHired == "" && job.userId == user.uid && (
          <div className={styles.convites}>
            <div className={styles.convitesTitle}>
              <h3>Convites</h3>
              <h5>({job.invitesLeft} restantes)</h5>
            </div>
            <p style={{ marginTop: -5 }}>
              Notificamos trabalhadores relevantes para o seu trabalho. Pode ter
              respostas mais rápidas se convidar trabalhadores!
            </p>
            <Link
              to={`/convidar-trabalhadores/${jobId}`}
              className={styles.btnConvite}
            >
              Convida trabalhadores
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobPage;
