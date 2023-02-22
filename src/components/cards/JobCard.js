const JobCard = (props) => {
    console.log(props)
    
    return (
      <div>
       <h3>Headline: {props.value.headline}</h3>
       <h3>Description: {props.value.description}</h3>
     </div>
   
    )
  }
  
  export default JobCard