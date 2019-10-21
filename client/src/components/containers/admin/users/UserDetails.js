import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import avatar from "../../../../assets/images/banner1.jpeg";

class UserDetails extends Component {

  /**
 * Deletes poll from the poll database
 */
  onDelete = async (userId) => {
    const { deleteUser } = this.props;
    try {
      await deleteUser( userId );
      window.location.href = "/dashboard/index/users";
    } catch ( err ) { }
  }
  render() {
    const { users: { users }, match } = this.props;
    const currentUser = users && users.find( user => user._id === match.params.userId );


    return (
      <div>
        <div className="detail">

          <Row className="justify-content-md-center">
            <Col md={10}>
              <img src={avatar} alt="poll" />
              <hr />

              <Row className="mb-5 mt-3">
                <Col md={12}>
                  <p><strong>Name</strong>:{currentUser && currentUser.firstName} {currentUser && currentUser.lastName}</p>
                  <p><strong>Email</strong>:{currentUser  && currentUser.email}</p>
                </Col>
              </Row>
              <Row className="justify-content-md-right">
                <Button
                  variant="danger"
                  onClick={() => this.onDelete(currentUser._id)}
                >Delete user</Button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default UserDetails;