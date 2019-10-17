import React, { PureComponent } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";

const NewPollForm = () => {
  return (
    <div className="new-poll-form">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h3>Crea new poll</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="form-control"
                // value={email}
                // onChange={( e ) => handleChange( "email", e )}
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
                // value={password}
                // onChange={( e ) => handleChange( "password", e )}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="button"
              // onClick={( e ) => onSubmit( e )}
            >
            Submit
            </Button>
          </Form>
          </Col>
        </Row>
    </div>
  )
}

export default NewPollForm;