import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import pollposter from "../../../../assets/images/banner1.jpeg";

class PollList extends Component {

  render() {
    const { polls: { polls }, match } = this.props;
    const pollData = polls && polls.map( poll => (
      <Col md={4} key={poll._id}>
        <h3>Poll list</h3>
          <div className="poll-card">
            <div className="poll-image">
              <img src={pollposter} alt="poll" />
            </div>
            <hr />
            <p className="lead">{poll.name}</p>
          <p className="view">
            <Link to={`${ match.url }/${ poll._id }`} style={{ textDecoration: "none" }}>
              View details
            </Link>
          </p>
          </div>
       
      </Col>
    ) )
    
    return (
      <div>
        <Row>
          {pollData}
        </Row>
      </div>
    )
  }
}

export default PollList