import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container text textAlign='center'>
      <h1>404: Not found</h1>
      <Button as={Link} to='/'>
        Back to home
      </Button>
    </Container>
  );
}
