import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/signup.jpeg";

const Home = () => {
  return (
    <div className="home">
      <Container className="hcontainer">
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <Row className="justify-content-md-center">
              <img src={avatar} alt="avatar" />
            </Row>  
            <p className="mt-5">JOIN OUR TEAM OF SaaS DEVELOPERS</p>
            <Row className="justify-content-md-center">
              <Link to="/user-signup" className="btn btn-warning">Register now</Link>
            </Row> 
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;