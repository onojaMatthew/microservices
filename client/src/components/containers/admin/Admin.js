import React, { Component } from "react";
import { Route, Switch } from "react-router-dom"
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Poll from "./poll/Poll";
import Users from "./users/Users";
import AdminIndex from "./AdminIndex";

class Admin extends Component {
  render() {
    const { match } = this.props
    
    return (
      <div>
        <Row>
          <Col sm={12} md={3}>
            <Sidebar />
          </Col>
          <Col sm={12} md={9}>
            <Switch>
              <Route exact path={`${ match.url }/`} component={AdminIndex} />
              <Route path={`${ match.url }/polls`} component={Poll} />
              <Route path={`${ match.url }/users`} component={Users} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;