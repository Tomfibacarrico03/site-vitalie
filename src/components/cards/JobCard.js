import { Link } from "react-router-dom";

const JobCard = (props) => {
  console.log(props.value);
  const job = props.value.job;
  const user = props.value.user;
  return (
    <div>
      <Link style={{ textDecoration: "none" }} to={`/meustrabalhos/${job.id}`}>
        <>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p
              style={{
                fontFamily: "Avenir Next",
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
                fontFamily: "Avenir Next",
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
              fontSize: 16,
              marginTop: 10,
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
              <div
                style={{
                  border: "2px solid #bfbfbf",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <p style={{ fontFamily: "Avenir Next", color: "#000" }}>
                  Comerciantes locais adequados foram alertados sobre o seu
                  trabalho. Assim que houver interesse, informaremos.
                </p>
              </div>
              <div>
                <p>Tem mais trabalhadores, rápido</p>
                <Link>Convida Trabalhadores</Link> 10 convites restantes
              </div>
            </>
          ) : (
            <>
              {job.feedback == false ? (
                <div
                  style={{
                    border: "2px solid #bfbfbf",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <p style={{ fontFamily: "Avenir Next", color: "#000" }}>
                    Trabalhador contratado. Deixa a tua crítica após ele
                    completar o seu serviço
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    border: "2px solid #bfbfbf",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <p style={{ fontFamily: "Avenir Next", color: "#000" }}>
                    Crítica submetida
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
      <hr style={{ border: "1px solid #e8e8e9", marginTop: 25 }}></hr>
    </div>
  );
};

export default JobCard;
