const InterestedUserCard = (props) => {
  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          marginTop: -20,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <p style={{ marginBottom: 0, fontSize: 13, marginTop: 5, marginBottom: 5, textAlign: "left", color: "#333", borderRadius: 5}}>
          {props.value.firstName} {props.value.lastName}
        </p>
        <br></br>
        <p
          style={{
            fontFamily: "Raleway",
            fontSize: 14,
            marginLeft: 10,
            marginTop: -10,
            paddingLeft: 5,
            padding: 5,
            marginTop: 5,
            marginBottom: 5,
            color: "#8c8c8c",
          }}
        >
          {props.value.reviewCount == 0 ? (
            "Ainda sem críticas"
          ) : (
            <>
              {props.value.reviewCount} crítica(s) -{" "}
              {(props.value.positiveReviewCount / props.value.reviewCount) *
                100}{" "}
              % positivo
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default InterestedUserCard;
