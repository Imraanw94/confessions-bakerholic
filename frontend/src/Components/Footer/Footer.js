import { Card, Container } from "react-bootstrap";
import FooterMenu from "./FooterMenu"; // Footer Menu Component for navigation
import { Instagram } from "react-bootstrap-icons";

// The Footer Component Function
function Footer(props) {
  return (
    <Container className="footer text-center mb-5">
      <FooterMenu></FooterMenu>
      <Card className="mt-3">
        <Card.Body>
          <h1 style={{ fontStyle: "italic", borderRadius: "10px" }}>
            Confessions of a Bakerholic
          </h1>
          <Card.Title>
            Follow Us On Instagram! <Instagram className="me-1" />
            <Card.Link href="https://www.instagram.com/confessionsofabakerholic/" target="_blank" style={{background: "none"}}>Instagram Link</Card.Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Footer;
