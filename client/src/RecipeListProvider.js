import { useEffect, useState } from "react";
import { RecipeContext } from "./RecipeListContext.js";

function RecipeListProvider({ children }) {
  const [recipeLoadObject, setRecipeLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    try {
      setRecipeLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8000/recipe/list`, {
        method: "GET",
      });
      const responseJson = await response.json();
      if (response.status < 400) {
        setRecipeLoadObject({ state: "ready", data: responseJson });
      } else {
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      console.error(error);
      setRecipeLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  async function handleCreate(dtoIn) {
    try {
      setRecipeLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8000/recipe/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();
      if (response.status < 400) {
        setRecipeLoadObject((current) => ({
          state: "ready",
          data: [...current.data, responseJson],
        }));
      } else {
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      console.error(error);
      setRecipeLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  async function handleUpdate(dtoIn) {
    try {
      setRecipeLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8000/recipe/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();
      if (response.status < 400) {
        const updatedData = current.data.map((recipe) =>
          recipe.id === dtoIn.id ? responseJson : recipe
        );
        setRecipeLoadObject({ state: "ready", data: updatedData });
      } else {
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      console.error(error);
      setRecipeLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  async function handleDelete(dtoIn) {
    try {
      setRecipeLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8000/recipe/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();
      if (response.status < 400) {
        const updatedData = current.data.filter(
          (recipe) => recipe.id !== dtoIn.id
        );
        setRecipeLoadObject({ state: "ready", data: updatedData });
      } else {
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      console.error(error);
      setRecipeLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  const value = {
    state: recipeLoadObject.state,
    recipeList: recipeLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeListProvider;

