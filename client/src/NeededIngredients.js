import React from "react";

function NeededIngredients({ ingredients }) {
  return (
    <div className={"rounded"} style={componentStyle()}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Needed Ingredients:</div>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

function componentStyle() {
  return {
    backgroundColor: "#f9f9f9",
    padding: "12px",
    borderRadius: "8px",
    marginTop: "20px",
  };
}

export default NeededIngredients;
