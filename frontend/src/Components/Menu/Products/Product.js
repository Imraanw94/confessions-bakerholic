import { useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

// Product Component
// Admins can edit or delete products
function Product(props) {
  // We use the useRef hooks below to help store the values the user inputs
  const nameRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef("");

  // This state is used to enable/disable the input fields
  const [disable, setDisable] = useState(true);
  // This state is used to enable/disable the Cancel button
  const [cancelDisable, setCancelDisable] = useState(true);
  // This state is used to set the component as editable or not
  const [edit, setEdit] = useState(false);
  // This state is used to change the edit button text
  const [editBtnText, setEditBtnText] = useState("Edit Product");

  // This function handles editing the Product
  function editProductHandler() {
    // Collect the user input values using the useRef hooks
    const name = nameRef.current.value;
    const description = descRef.current.value;
    const price = priceRef.current.value;

    // Simple validation disallowing empty strings
    if (
      !name ||
      onlySpaces(name) ||
      !description ||
      onlySpaces(description) ||
      !price ||
      onlySpaces(price)
    ) {
      alert("All fields must not be empty");
    } else {
      // Create a Product object with necesssary properties
      const product = {
        id: props.id,
        name: name,
        description: description,
        price: price,
      };

      // Send the object back to MenuPage to be used in editing the Product
      props.onEditProduct(product);
      setEdit(false);
    }
  }

  // Delete the product using the ID of the product
  function deleteProductHandler() {
    props.onDeleteProduct({ value: props.id });
  }

  // This function is called when the user clicks the edit button
  function clickEditButtonHandler() {
    if (edit) {
      // If the fields are editable
      editProductHandler();
      setEditBtnText("Edit Product");
      setCancelDisable(true); // Disable the cancel button
      setDisable(true); // Make the fields disabled
    } else {
      // If the fields are not editable
      setEdit(true);
      setEditBtnText("Submit");
      setCancelDisable(false); // Enable the cancel button
      setDisable(false); // Make the fields editable
    }
  }

  // This function is called when the user clicks the delete button
  function clickDeleteButtonHandler() {
    // Display a confirmation alert asking the user to confirm deletion
    let confirmAction = window.confirm(
      "Are you sure you want to delete this Product?"
    );
    if (confirmAction) {
      // If the user confirms, delete the product
      deleteProductHandler();
    }
  }

  // This function is called when the user clicks the cancel button
  function clickCancelButtonHandler() {
    setEdit(false); // Set the component as uneditable
    setEditBtnText("Edit Product"); // Set the edit button text
    setCancelDisable(true); // Set the cancel button to disabled
    setDisable(true); // Disable the fields
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicModel">
            <Form.Label><h4>Name</h4></Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.name}
              disabled={disable}
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMake">
            <Form.Label><h4>Description</h4></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={props.description}
              disabled={disable}
              ref={descRef}
            />
          </Form.Group>
          <Form.Label><h4>Price</h4></Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>R</InputGroup.Text>
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              disabled={disable}
              defaultValue={props.price}
              ref={priceRef}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </Form>
        {props.isAdmin && (
          <div>
            <Button
              className="me-2"
              variant="primary"
              onClick={clickEditButtonHandler}
            >
              {editBtnText}
            </Button>
            <Button
              className="me-2"
              variant="secondary"
              onClick={clickCancelButtonHandler}
              disabled={cancelDisable}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={clickDeleteButtonHandler}>
              Delete Product
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
