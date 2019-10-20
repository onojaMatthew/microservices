import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { isAuthenticated, userType } from "../helpers/authenticate";
import history from "../helpers/history";
import Auth from "../helpers/Auth";
import { logout } from "../store/actions/actions_signup";
  

class Header extends Component{
  state = {
    isUserAuthenticated: false
  }

  componentDidMount() {
    if ( isAuthenticated().token ) {
      this.setState( {
        isUserAuthenticated: true
      } )
    }
  }

  handleLogout = async () => {
    const { logout } = this.props;
    Auth.deauthenticateUser();
    await logout();
    window.location.href = "/user-login";
  }

  render() {
    
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Poll App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/polls">Polls</Nav.Link>
            {userType() === "admin" ? (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/dashboard">Sign up as admin</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard/login">Login as admin</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            ) : (
                <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/user-signup">Sign up as user</NavDropdown.Item>
                  <NavDropdown.Item href="/user-login">Login as user</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              )}
          </Nav>
          <>
            {this.state.isUserAuthenticated === true ? (
              <div
                className="btn btn-info"
                onClick={this.handleLogout}
              >
                Log out
              </div>
            ) : null}
          </>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatchtoProps = ( dispatch ) => {
  const dispatchProps = {
    logout: () => dispatch( logout() )
  }

  return dispatchProps;
}


export default connect(null, mapDispatchtoProps)(Header);