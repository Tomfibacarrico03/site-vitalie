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
        <p style={{ fontFamily: "Avenir Next", color: "#000" }}>
          {props.value.firstName} {props.value.lastName}
        </p>
        <p
          style={{
            fontFamily: "Avenir Next",
            marginLeft: 10,
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
