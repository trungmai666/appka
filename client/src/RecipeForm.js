import { useContext, useState } from "react";
import { RecipeContext } from "./RecipeContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function RecipeForm({ setShowRecipeForm, recipe }) {
  const { state, handlerMap } = useContext(RecipeContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowRecipeForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          // Process form data as needed
          try {
            if (recipe.id) {
              formData.id = recipe.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }

            setShowRecipeForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${recipe.id ? "Edit" : "Create"} Recipe`}</Modal.Title>
          <CloseButton onClick={() => setShowRecipeForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Failed to create recipe</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          {/* Form fields */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRecipeForm(false)}
            disabled={isPending}
          >
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {recipe.id ? "Edit" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default RecipeForm;
