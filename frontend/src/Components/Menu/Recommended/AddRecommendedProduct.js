import { useRef } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { getCookie } from "../../../cookieService";

// This component can be used by any user to add a product recommendation
function AddRecommendedProduct(props) {
  // We use the useRef hooks below to help store the values the user inputs
  const nameRef = useRef("");
  const recipeRef = useRef("");
  const picRef = useRef("");

  // With this function we collect the user inputs and add the product recommendation
  function addRecommendationHandler(event) {
    // Collect the user input values using the useRef hooks
    const name = nameRef.current.value;
    const recipe = recipeRef.current.value;
    const picture = picRef.current.value;
    const userId = getCookie("user");

    // Simple validation disallowing empty strings
    if (!name || onlySpaces(name)) {
      alert("Product Name must not be empty");
    } else {
      // Create a Product object with necesssary properties
      const recommendation = {
        name: name,
        recipe: recipe,
        picture: picture,
        author: userId,
      };
      // Send the object back to App.js to be used in adding the recommendation
      props.onAddRecommendedProduct(recommendation);
    }
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }
  return (
    <Container>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Recommend a Product</Card.Title>
          <Card.Text>
            Recommend a product you would like to see or view the products you
            have already recommended
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="p-3 suggestion-card">
        <Form className="suggestion-form">
          <Form.Group className="mb-3" controlId="formBasicProduct">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              ref={nameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRecipeLink">
            <Form.Label>Example Recipe Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example Recipe Link"
              ref={recipeRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicVisualLink">
            <Form.Label>Link to Visual Example</Form.Label>
            <Form.Control
              type="text"
              placeholder="Link to Visual Example"
              ref={picRef}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={addRecommendationHandler}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddRecommendedProduct;
