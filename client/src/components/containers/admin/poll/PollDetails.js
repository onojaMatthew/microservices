import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import avatar from "../../../../assets/images/banner1.jpeg";
import { userType } from "../../../../helpers/authenticate";
import EditPoll from "./EditPoll";

class PollDetails extends Component {
  state = {
    isShow: false
  }

  toggleIsShow = () => {
    this.setState( ( prevstate ) => {
      return {
        isShow: !prevstate.isShow
      }
    })
  }

  renderView = () => {
    const { isShow } = this.state;
    const { polls: { polls }, match } = this.props;
    const selectedPoll = polls && polls.find( poll => poll._id === match.params.pollId );
    const tag = selectedPoll && selectedPoll.tags.map( tag => tag )
    console.log( tag )
    if ( isShow ) {
      return <EditPoll />
    } else {
      return (
        <div className="detail">
          <Row className="justify-content-md-center">
            <Col md={10}>
              <img src={avatar} alt="poll" />
              <Row className="mb-5">
                <Col md={4}>
                  <h4>tags: {tag && tag.join( " " )}</h4>
                </Col>
                <Col md={4}>
                  <h4>Votes: {selectedPoll && selectedPoll.votes.length}</h4>
                </Col>
                <Col md={4}>
                  <h4>Likes: {selectedPoll && selectedPoll.likes.length}</h4>
                </Col>
              </Row>

              {userType() === "admin" ? (
                <Row>
                  <Col md={4}>
                    <Button
                      onClick={this.toggleIsShow}
                      variant="info"
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button variant="warning">Disable</Button>
                  </Col>
                  <Col md={4}>
                    <Button variant="danger">Delete</Button>
                  </Col>
                </Row>
              ) : (
                  <Row>
                    <Col md={4}>
                      <Button>Like</Button>
                    </Col>
                    <Col md={4}>
                      <Button>Vote</Button>
                    </Col>
                  </Row>
                )}
              <hr />

              <Row className="mb-5 mt-5">
                <Col md={12}>
                  <form class="form-inline">
                    <div class="form-group mx-sm-3 mb-2">
                      <input type="text" className="form-control" placeholder="Comment" />
                    </div>
                    <button className="btn btn-info mb-2">Post Comment</button>
                  </form>
                </Col>
              </Row>

              <Row className="mb-5">

                <Col>
                  <h5>Comments</h5>
                  <p><strong>User name</strong></p>
                  <p>Some message go here for poll</p>
                </Col>

              </Row>
            </Col>
          </Row>
        </div>
      )
    }
  }
  render() {
    
    return (
      <div className="mt-5">
        {this.renderView()}
      </div>
    );
  }
}

export default PollDetails;