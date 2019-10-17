import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import banner from "../../../assets/images/banner1.jpeg"
import Banner from './Banner';
import NewPoll from './poll/NewPoll';

class AdminIndex extends Component {
  render() {
    return (
      <div>
        <Banner /> 
        <hr />
        <Row className="justify-content-md-center">
          <NewPoll/>
        </Row>
      </div>
    )
  }
}

export default AdminIndex;
