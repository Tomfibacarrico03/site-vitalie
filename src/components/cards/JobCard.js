
const JobCard = (props) => {
  
    
    return (
      <div>
        <p>=================</p>
       <p>Headline: {props.value.headline}</p>
       <p>Trade: {props.value.tradeSelected}</p>
       <p>Postado a {props.value.createdAt.toDate().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })} </p>
       <p>Comerciantes locais adequados foram alertados sobre o seu trabalho. Assim que houver interesse, informaremos.</p>
       <p>=================</p>
     </div>

   
    )
  }
  
  export default JobCard