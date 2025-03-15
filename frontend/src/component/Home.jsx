
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css';

const HomePage = () => {
    return (
      <div className="center-in-page">
      
        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col lg={8}>
              <h1 className="display-4">Welcome to <br /><span className="  task">Task Management </span></h1>
              <p className="lead mb-4">
              Easily manage tasks, boost productivity, work together smoothly, and get more done in less time.
              </p>
            </Col>
            <Col>
            <img src="/src/assets/home.gif" alt="Login Page" className="img-home"  />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

export default HomePage;
