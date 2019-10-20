import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import avatar from "../../../assets/images/banner1.jpeg";
import { isAuthenticated } from "../../../helpers/authenticate";

const token = isAuthenticated().token;
const PollList = ( { polls: { polls }, match, } ) => {
  console.log(polls, " from poll lis")
  const pollData = polls && polls.map( poll => (
    <Col md={4} key={poll._id}>
      <div className="poll-card">
        <div className="poll-image">
          <img src={avatar} alt="poll" />
        </div>
        <hr />
        <p className="lead">{poll.name}</p>
        <p className="view">
          {/* {token ? ( */}
            <Link to={`/polls/${ poll._id }`} style={{ textDecoration: "none" }}>
              View details
            </Link>
          {/* ): (
            <Redirect to={"/user-login"} />
          )} */}
        </p>
      </div>
    </Col>
  ) )
  return (
    <div className="signup">
      <div className="container">
        <Row>
          {pollData}
        </Row>
      </div>
    </div>
  );
}

export default PollList;
