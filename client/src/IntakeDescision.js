import Dropdown from "react-bootstrap/Dropdown";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { RecipeListContext } from "./RecipeListContext";

import Icon from "@mdi/react";
import {
  mdiFoodAppleOutline,
  mdiFoodDrumstickOutline,
  mdiFoodVariantOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

function RecipeDecision({ recipe }) {
  const { loggedInUser } = useContext(UserContext);
  const { handlerMap } = useContext(RecipeListContext);

  const loggedInUserIntake = getLoggedInUserIntake(recipe, loggedInUser);
  const servingsCount = recipe.userMap?.[loggedInUser?.id]?.servings || 0;
  const servingsColor = getServingsColor(servingsCount);

  return loggedInUser ? (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="intakeDecision"
          variant="light"
          style={dropdownStyle()}
        >
          <Icon
            path={loggedInUserIntake.iconPath}
            size={0.8}
            color={loggedInUserIntake.color}
          />{" "}
          <span style={componentStyle(loggedInUserIntake.color)}>
            {loggedInUserIntake.intake}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {decisionButton({
            handlerMap,
            recipe,
            loggedInUser,
            color: "#69a765",
            text: "eat",
          })}
          {decisionButton({
            handlerMap,
            recipe,
            loggedInUser,
            color: "#ff2216",
            text: "skip",
          })}
          {decisionButton({
            handlerMap,
            recipe,
            loggedInUser,
            color: "#ffb447",
            text: "unsure",
          })}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle
          id="plusServings"
          variant="light"
          style={dropdownStyle()}
        >
          <Icon path={mdiPlusCircleOutline} size={0.8} color={servingsColor} />{" "}
          <span style={componentStyle(servingsColor)}>{servingsCount}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[0, 1, 2, 3, 4, 5, 6].map((numberOfServings) => {
            return servingsButton({
              handlerMap,
              recipe,
              loggedInUser,
              numberOfServings,
            });
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : null;
}

function dropdownStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    background: "none",
    border: "none",
  };
}

function getLoggedInUserIntake(recipe, loggedInUser) {
  let intake;
  let iconPath;
  let color;
  if (loggedInUser && recipe.userMap?.[loggedInUser?.id]?.intake === "eat") {
    intake = "Enjoy";
    iconPath = mdiFoodAppleOutline;
    color = "#69a765";
  } else if (
    loggedInUser &&
    recipe.userMap?.[loggedInUser?.id]?.intake === "skip"
  ) {
    intake = "Skip";
    iconPath = mdiFoodDrumstickOutline;
    color = "#ff2216";
  } else {
    intake = "Unsure";
    iconPath = mdiFoodVariantOutline;
    color = "#ffb447";
  }
  return { intake, iconPath, color };
}

function componentStyle(color) {
  return {
    fontSize: "18px",
    color: color,
  };
}

function decisionButton({ handlerMap, recipe, loggedInUser, color, text }) {
  return (
    <Dropdown.Item
      key={text}
      style={{ color }}
      onClick={() =>
        handlerMap.handleIntake({
          recipeId: recipe.id,
          userId: loggedInUser.id,
          intake: text === "eat" ? "eat" : text === "skip" ? "skip" : null,
        })
      }
    >
      {text}
    </Dropdown.Item>
  );
}

function servingsButton({ handlerMap, recipe, loggedInUser, numberOfServings }) {
  return (
    <Dropdown.Item
      key={numberOfServings.toString()}
      style={{ color: getServingsColor(numberOfServings) }}
      onClick={() =>
        handlerMap.handleIntake({
          recipeId: recipe.id,
          userId: loggedInUser.id,
          servings: numberOfServings,
        })
      }
    >
      {numberOfServings}
    </Dropdown.Item>
  );
}

function getServingsColor(servingsCount) {
  return servingsCount > 0 ? "#69a765" : "#707373";
}

export default RecipeDecision;

