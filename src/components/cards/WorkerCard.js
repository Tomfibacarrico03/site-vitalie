import { differenceInMonths } from "date-fns";
import styles from "../../css/inviteWorkers.module.css";

const WorkerCard = ({ worker }) => {
  console.log(worker);
  const createdAt = worker.trades_member_since.toDate();
  const monthsSinceCreation = differenceInMonths(new Date(), createdAt);

  let formattedString = "";
  if (monthsSinceCreation === 0) {
    formattedString = "Membro este mês";
  } else {
    formattedString = `Membro há ${monthsSinceCreation} meses`;
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
        padding: 15,
        marginBottom: 15,
        width: "45%"
      }}
    >
      <div className={styles.tituloCriticas}>
        <header>
          <h3>{worker.workName}</h3>
          <button>Convide para orçamentar</button>
        </header>
        <h5>24 críticas - 100% positivas</h5>
      </div>

      <div className={styles.local}>
        <p style={{ color: "#000", fontFamily: "Raleway", marginBottom: -5 }}>
          {worker.tradesSelected[0]} - {worker.location[0]}{" "}
        </p>
        <p>{formattedString}</p>
      </div>

      <p
        style={{
          marginLeft: 11,
          borderRadius: 0,
          paddingBottom: 10,
          top: 4,
          alignItems: "center",
          borderBottom: "1px solid #508ce4",
          fontFamily: "Raleway",
        }}
      >
        {worker.description}
      </p>
    </div>
  );
};

export default WorkerCard;
