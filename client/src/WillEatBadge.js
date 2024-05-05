function WillEatBadge({ calorieCount }) {
  // Determine badge color based on calorie count
  let color;
  if (calorieCount < 500) color = "#ff2216"; // Red for low calorie count
  else if (calorieCount < 800) color = "#ffb447"; // Orange for moderate calorie count
  else color = "#69a765"; // Green for high calorie count

  return (
    <div className={"rounded"} style={componentStyle(color)}>
      Calorie Intake <b>{calorieCount}</b>
    </div>
  );
}

function componentStyle(color) {
  return {
    color: color,
    padding: "8px 0",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
    fontSize: "18px",
    lineHeight: 1,
  };
}

export default WillEatBadge;

