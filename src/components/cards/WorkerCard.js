import { differenceInMonths } from "date-fns";

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
        <p>=================</p>
       <h3>{props.value.workName}</h3>
       <h5>24 críticas - 100% postivas</h5>
       <button>Convide para orçamentar</button>
       <p>{props.value.tradesSelected[0]} -- {props.value.location[0]} </p>
       <p>{formattedString}</p>
       <p>{props.value.description}</p>
       <p>=================</p>
     </div>
    )
}
  
export default WorkerCard