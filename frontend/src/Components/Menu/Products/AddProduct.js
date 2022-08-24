import { useRef } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

// Add Product Component used by Admins
function AddProduct(props) {
  // We use the useRef hooks below to help store the values the user inputs
  const nameRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef("");

  // With this function we collect the user inputs and add the product
  function addProductHandler(event) {
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
        name: name,
        description: description,
        price: price,
      };
      // Send the object back to MenuPage to be used in adding the Product
      props.onAddProduct(product);
    }
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  return (
    <Card>
      <Card.Header><h2>Add a new Product</h2></Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label><h3>Name</h3></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of your product"
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>
              <h3>Description</h3>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a description of your product"
              ref={descRef}
            />
          </Form.Group>
          <Form.Label><h3>Price</h3></Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>R</InputGroup.Text>
            <Form.Control
              aria-label="Amount (in rands)"
              defaultValue={props.price}
              ref={priceRef}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <Button variant="primary" type="button" onClick={addProductHandler}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddProduct;
