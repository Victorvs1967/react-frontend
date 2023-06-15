import { Link } from "react-router-dom";
import { Button, Container } from 'reactstrap'
import AppNavbar from "./AppNavbar";

const Home = () => {
  return (
    <>
      <AppNavbar />
      <Container fluid>
        <Button color="link">
          <Link to="/books">
            <h4>Manage My Books</h4>
          </Link>
        </Button>
      </Container>
    </>
  );
};

export default Home;