import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Discussion SaaS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Features</Nav.Link>
          <NavDropdown title="Sign up" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin-signup">Sign up as admin</NavDropdown.Item>
            <NavDropdown.Item href="user-signup">Sign up as user</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          <NavDropdown title="Log in" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/admin-login">Login as admin</NavDropdown.Item>
            <NavDropdown.Item href="/user-login">Login as user</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;