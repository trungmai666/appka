import WillEatBadge from "./WillEatBadge";
import RecipeDecision from "./RecipeDecision";

function RecipeDetail({ recipe }) {
  let willEatCount = 0;
  if (recipe.userMap) {
    Object.entries(recipe.userMap).forEach(([key, value]) => {
      if (value.intake === "eat") willEatCount++;
      if (value.servings) willEatCount += value.servings;
    });
  }

  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div style={{ fontSize: "22px" }}>{recipe.name}</div>
      <div className="row" style={{ margin: "0" }}>
        <div className="col-12 col-sm-6" style={{ padding: "0" }}>
          <WillEatBadge calorieCount={willEatCount} />
        </div>
        <div className="col-12 col-md-6" style={decisionColumnStyle()}>
          <RecipeDecision recipe={recipe} />
        </div>
      </div>
    </div>
  );
}

function decisionColumnStyle() {
  return { display: "flex", justifyContent: "right", padding: "0" };
}

export default RecipeDetail;

  return { display: "flex", justifyContent: "right", padding: "0" };
}

export default EventDetail;
