import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiFoodApple, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function Navbar() {
  const { userList, loggedInUser, handlerMap } = useContext(RecipeContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiFoodApple} size={1} color={"white"} spin={5} />
            Recipe Manager
          </Button>
        </Navbar.Brand>
        <Nav>
          <NavDropdown
            title={loggedInUser ? loggedInUser.name : "Login"}
            drop={"start"}
          >
            {getUserMenuList({ userList, loggedInUser, handlerMap })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#d63232" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
  };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Logout"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default Navbar;

