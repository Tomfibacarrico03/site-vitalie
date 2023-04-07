import { differenceInMonths } from "date-fns";
import styles from "../../css/inviteWorkers.module.css"

const WorkerCard = (props) => {
    const createdAt = props.value.trades_member_since.toDate();
    const monthsSinceCreation = differenceInMonths(new Date(), createdAt);

    let formattedString = "";
    if (monthsSinceCreation === 0) {
    formattedString = "Membro este mês";
    } else {
    formattedString = `Membro há ${monthsSinceCreation} meses`;
    }
    
    return (
      <div>
        <div className={styles.tituloCriticas}>
          <header>
            <h3>{props.value.workName}</h3>
            <button>Convide para orçamentar</button>
          </header>
        <h5>24 críticas - 100% positivas</h5>

        </div>

        <hr></hr>
        <div className={styles.local}>
          <p>{props.value.tradesSelected[0]} - {props.value.location[0]} </p>
          <p>{formattedString}</p>
        </div>

        <p>{props.value.description}</p>
     </div>
    )
}
  
export default WorkerCard