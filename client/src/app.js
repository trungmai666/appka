import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import RecipeList from "./RecipeList";
import UserProvider from "./UserProvider";
import RecipeListProvider from "./RecipeListProvider";
import RecipeProvider from "./RecipeProvider";
import RecipeRoute from "./RecipeRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <RecipeListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<RecipeList />} />
                <Route
                  path="IntakeDetail"
                  element={
                    <RecipeProvider>
                      <RecipeRoute />
                    </RecipeProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RecipeListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

export default App;
