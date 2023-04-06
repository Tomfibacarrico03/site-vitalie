
const JobCard = (props) => {
     
  return (
    <div>
      <div style={{display: "inline-flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
        <p style={{fontFamily: "Avenir Next", color: "#000", fontSize: 19, fontWeight: "bold"}}>{props.value.headline}</p>
        <p style={{fontSize: 12, color: "#8c8c8c", fontFamily: "Avenir Next", fontWeight: 500}}>{props.value.createdAt.toDate().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      {/* <p style={{fontFamily: "Avenir Next", color: "#333", fontSize: 12, marginTop: -15, fontWeight: "600"}}>Postado a {props.value.createdAt.toDate().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })} </p> */}
 
      <p style={{fontFamily: "Avenir Next", color: "#000", fontSize: 16, marginTop: 10, fontWeight: "600"}}>{props.value.tradeSelected}</p>
      <p style={{fontFamily: "Avenir Next", color: "#219ebc", fontSize: 14, marginTop: -10, fontWeight: "600"}}>1 pessoa interessada</p>
      <div style={{border: "2px solid #bfbfbf", padding: 10, borderRadius: 5}}>
        <p style={{fontFamily: "Avenir Next", color: "#000"}}>Comerciantes locais adequados foram alertados sobre o seu trabalho. Assim que houver interesse, informaremos.</p>
      </div>
      <hr style={{border: "1px solid #e8e8e9", marginTop: 25}}></hr>
    </div>  
  )
}
  
export default JobCard