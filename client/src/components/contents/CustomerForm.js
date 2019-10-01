import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import avatar from "../../assets/images/signup.jpeg";

function CustomerForm( { caption, photo, handleChange, onSubmit, title } ) {
  return (
    <div className="signup">
      <form encType="multipart/form-data">
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Photo caption</Form.Label>
          <Form.Control
            type="text"
            placeholder="Photo caption"
            className="form-control"
            value={caption}
            name="caption"
            onChange={(e) => handleChange(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Upload photo</Form.Label>
          <Form.Control
            type="file"
            className="form-control"
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="button"
          onClick={( e ) => onSubmit( e )}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CustomerForm;
