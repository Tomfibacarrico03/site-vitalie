import { Link } from "react-router-dom";
import styles from "../../css/minhaconta.module.css";

const JobCard = (props) => {
  console.log(props.value);
  const job = props.value.job;
  const user = props.value.user;
  return (
    <div className={styles.cardJob}>
      <Link style={{ textDecoration: "none" }} to={`/meustrabalhos/${job.id}`}>
        <>
          <div className={styles.headerDateTitle}>
            <p
              style={{
                fontFamily: "Raleway",
                color: "#000",
                fontSize: 19,
                fontWeight: "bold",
              }}
            >
              {job.headline}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#8c8c8c",
                fontFamily: "Raleway",
                fontWeight: 500,
              }}
            >
              {job.createdAt.toDate().toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          {/* <p style={{fontFamily: "Avenir Next", color: "#333", fontSize: 12, marginTop: -15, fontWeight: "600"}}>Postado a {job.createdAt.toDate().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })} </p> */}

          <p
            style={{
              fontFamily: "Avenir Next",
              color: "#000",
              fontSize: 25,
              marginTop: 10,
              marginBottom: 5,
              fontWeight: "600",
            }}
          >
            {job.tradeSelected}
          </p>
        </>
      </Link>

      {job.userId == user.uid && (
        <>
          {job.userHired == "" ? (
            <>
              <div>
                <p style={{ color: "#8c8c8c", fontFamily: "Raleway" }}>
                  Comerciantes locais adequados foram alertados sobre o seu
                  trabalho. Assim que houver interesse, informaremos.
                </p>
              </div>
              <div
                style={{
                  background: "#f2f2f2",
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingBottom: 1,
                  borderRadius: 10,
                  marginTop: 25,
                }}
              >
                <p
                  style={{
                    fontFamily: "Raleway",
                    fontSize: 20,
                    color: "#508ce4",
                    marginBottom: 10,
                  }}
                >
                  Tem mais trabalhadores, rápido
                </p>
                <p
                  style={{
                    fontFamily: "Raleway",
                    color: "#8c8c8c",
                    fontSize: 14,
                  }}
                >
                  <Link
                    style={{
                      color: "#508ce4",
                      fontFamily: "Avenir Next",
                      textDecoration: "none",
                      paddingRight: 5,
                    }}
                  >
                    Convida Trabalhadores
                  </Link>{" "}
                  10 convites restantes
                </p>
              </div>
            </>
          ) : (
            <>
              {job.feedback == false ? (
                <div
                  style={{
                    border: "2px solid #e8e8e9",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <p style={{ fontFamily: "Raleway", color: "#8c8c8c" }}>
                    Trabalhador contratado. Deixa a tua crítica após ele
                    completar o seu serviço
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    border: "2px solid #e8e8e9",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <p style={{ fontFamily: "Raleway", color: "#8c8c8c" }}>
                    Crítica submetida
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
      <hr style={{ border: "3px solid #fff", marginTop: 25 }}></hr>
    </div>
  );
};

export default JobCard;
