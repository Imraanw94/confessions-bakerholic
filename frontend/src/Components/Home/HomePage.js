import { Card, Container, Stack } from "react-bootstrap";
import { Instagram } from "react-bootstrap-icons";

// This is the default page when a user visits the site. It'll just display some images of products, and an Instagram link
function HomePage(props) {
  // const oreoBall = require("./../../resources/images/oreo ball.webp");
  // const allChoc = require("./../../resources/images/all choc cookies.webp");

  return (
    <Container style={{ marginTop: "15px" }} className="home">
      <Card body className="text-center">
        <h1 style={{ fontStyle: "italic", fontSize: "52px" }}>
          Welcome to Confessions of a Bakerholic
        </h1>
      </Card>
      <Stack direction="horizontal" className="mb-3 image-stack" gap={2}>
        {/* <Stack direction="vertical">
          <Card.Img
            src={oreoBall}
            style={{ maxHeight: "500px" }}
          />
        </Stack>
        <Stack direction="vertical">
          <Card.Img
            src={allChoc}
            style={{ maxHeight: "500px" }}
          />
        </Stack> */}
      </Stack>
      <Card>
        <Card.Body className="text-center">
          <Card.Title>
            <h2>Follow Us On Instagram!</h2>
          </Card.Title>
          <Instagram
            className="me-1"
            style={{ fontSize: "32px", marginTop: "-12px" }}
          />
          <Card.Link
            style={{ fontSize: "32px" }}
            href="https://www.instagram.com/confessionsofabakerholic/"
            target="_blank"
          >
            Instagram Link
          </Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
