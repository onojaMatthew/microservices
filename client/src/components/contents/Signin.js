import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import avatar from "../../assets/images/signup.jpeg";

function Signin( { account, firstName, lastName, email, password, handleChange, onSubmit, title }) {
  return (
    <div className="signup mb-5">
      <Form>
        <div className="box-center">
          <img
            src={avatar}
            alt="avatar"
            style={{ background: "#fff" }}
          />
        </div>
        <h4
          style={{
            marginTop: 10,
            marginBottom: 10
          }}>{title}</h4>
        {account.error.length > 0 ? <Alert variant="danger">{account.error}</Alert> : null}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={email}
            onChange={(e) => handleChange("email", e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => handleChange("password", e)}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="button"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signin;