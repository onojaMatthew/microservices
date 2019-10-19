import React, { Component } from "react";
import { Route, Switch } from "react-router-dom"
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Poll from "./poll/Poll";
import Users from "./users/Users";
import AdminIndex from "./AdminIndex";
import SigninForm from "../SigninForm";
import SignupForm from "../SignupForm";
import AdminHome from "./AdminHome";

class Admin extends Component {
  state = {
    title: ""
  }

  componentDidMount() {

    switch ( window.location.pathname ) {
      case "/dashboard":
        return this.setState( { title: "Sign up as admin " } );
      case "/dasboard/login":
        return this.setState( { title: "Log in as admin" } );
     
      default:
        return this.state.title;
    }
  }
  render() {
    const { match } = this.props;
    const { title } = this.state;
    return (
      <div>
        <Row>
          <Col sm={12} md={12}>
            <Switch>
              <Route exact path={`${ match.url }`} component={() => <SignupForm title={title} />} />
              <Route path={`${ match.url }/login`} component={() => <SigninForm title={title} />} />
              <Route path={`${match.url}/index`} component={AdminHome}/>
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;