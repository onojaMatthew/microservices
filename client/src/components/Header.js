import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { isAuthenticated, userType } from "../helpers/authenticate";

const Header = () => {
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Discussion SaaS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Features</Nav.Link>
          {userType() === "admin" ? (
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/dashboard">Sign up as admin</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/login">Login as admin</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          ) : null}
          {userType() === "user" ? (
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/user-signup">Sign up as user</NavDropdown.Item>
              <NavDropdown.Item href="/user-login">Login as user</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          ) : null}
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;