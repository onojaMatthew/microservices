import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import avatar from "../../../assets/images/banner1.jpeg";
import { getUser } from "../../../store/actions/actions_signup";
import { getPoll } from "../../../store/actions/actions_polls";

class User extends Component {

  async componentDidMount() {
    const { getUser, match, getPoll } = this.props;
    const userId = match.params.userId;
    try {
      await getUser( userId );
      await getPoll();
    } catch(err) {}

  }
  /**
 * Deletes poll from the poll database
 */
  onDelete = async ( userId ) => {
    const { deleteUser } = this.props;
    try {
      await deleteUser( userId );
      window.location.href = "/dashboard/index/users";
    } catch ( err ) { }
  }
  render() {
    const { users, polls, match } = this.props;
    
    const currentUser = users && users.users ? users.users : null;
    const comment = polls.polls && polls.polls.comment ? polls.polls.comment : null;
    console.log( comment, "comment" );
    console.log( polls, "current user")
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
                  <p><strong>Email</strong>:{currentUser && currentUser.email}</p>
                </Col>
              </Row>
              <Row className="justify-content-md-right">
                <Button
                  variant="danger"
                  onClick={() => this.onDelete( currentUser._id )}
                >Delete user</Button>
              </Row>
            </Col>
          </Row> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.account,
    polls: state.polls
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchToProps = {
    getUser: ( userId ) => dispatch( getUser( userId ) ),
    getPoll: () => dispatch( getPoll()),
    // deleteUser: ( userId ) => dispatch( deleteUser( userId ) )
  }

  return dispatchToProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(User);