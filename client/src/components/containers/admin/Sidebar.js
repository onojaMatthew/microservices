import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import user from "../../../assets/images/user1.png"

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Row className="justify-content-md-center">
          <div className="user-image">
            <img src={user} alt="user" />
          </div>
        </Row>
        <Row className="justify-content-md-center name">
          <p>User name</p>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          <Link to={"/dashboard"}><h5>Dashboard</h5></Link>
        </Row>
        <Row className="justify-content-md-center">
          <div>
            <p><Link to={"/dashboard/polls"}>Poll Management</Link></p>
          </div>
        </Row>
        <Row className="justify-content-md-center">
          <div>
            <p><Link to={"/dashboard/users"}>Users Management</Link></p>
          </div>
        </Row>
      </div>
    );
  }
}

export default Sidebar;