import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import avatar from "../../../../assets/images/banner1.jpeg";
import { userType, isAuthenticated } from "../../../../helpers/authenticate";
import EditPoll from "./EditPoll";

class PollDetails extends Component {
  state = {
    isShow: false,
    isActive: false,
  }

  toggleIsShow = () => {
    this.setState( ( prevstate ) => {
      return {
        isShow: !prevstate.isShow
      }
    })
  }

  async componentDidMount() {
    const { fetchPoll, match } = this.props; 
    const pollId = match.params.pollId;
    try {
      // await fetchPoll( pollId );
    } catch(err) {}
    
  }

  toggleIsActive = () => {
    this.setState( ( prevState ) => {
      return {
        isActive: !prevState.isActive
      }
    })
  }


  toggleButton = () => {
    const { isActive } = this.state;
    const { polls, match } = this.props;
    let selectedPoll = polls && polls.polls && polls.polls.length > 0 ? polls.polls.find( poll => poll._id === match.params.pollId ) : null;

    if (selectedPoll && selectedPoll.disabled === true) {
      return (
        <Button
          variant="info"
          onClick={(e) => this.onEnable(selectedPoll._id, e)}
        >
          Enable
        </Button>
      )
    } else {
      return (
        <Button
          variant="warning"
          onClick={( e ) => this.onDisable( selectedPoll._id, e )}
        >
          Disable
       </Button>
      )
    }
  }
  
  /**
   * Deletes poll from the poll database
   */
  onDelete = async ( pollId, e ) => {
    e.preventDefault();
    const userId = isAuthenticated().user._id;
    const { deletePoll } = this.props;
    try {
      await deletePoll( pollId, userId )
      window.location.href = "/dashboard/polls";
    } catch(err) {}
  }

  onDisable = async ( pollId, e ) => {
    e.preventDefault();
    const { disablePoll } = this.props;
    try {
      await disablePoll( pollId );
    } catch ( err ) { }

  }

  onEnable = async ( pollId, e ) => {
    e.preventDefault();
    const { enablePoll } = this.props;
    try {
      await enablePoll( pollId );
    } catch ( err ) { }
    
  } 

  renderView = () => {
    const { isShow } = this.state;
    const { polls, match, tagPoll, createPoll, getPoll } = this.props;
    let selectedPoll = polls && polls.polls && polls.polls.length > 0 ? polls.polls.find( poll => poll._id === match.params.pollId ) : null;
    const tag = selectedPoll && selectedPoll.tags.map( tag => tag )
    if ( isShow ) {
      return (
        <EditPoll
          tagPoll={tagPoll}
          createPoll={createPoll}
          polls={polls}
          getPoll={getPoll}
          match={match}
        />
      )
    } else {
      return (
        <div className="detail">
          
          <Row className="justify-content-md-center">
            <Col md={10}>
              <h5>{selectedPoll && selectedPoll.name}</h5>
              <img src={avatar} alt="poll" />
              <Row>

              </Row>
              <Row className="mb-5 mt-3">
                <Col md={4}>
                  <h6><strong>tags</strong>: {tag && tag.join( " " )}</h6>
                </Col>
                <Col md={2}>
                  <h6><strong>Votes</strong>: {selectedPoll && selectedPoll.votes.length}</h6>
                </Col>
                <Col md={2}>
                  <h6><strong>Likes</strong>: {selectedPoll && selectedPoll.likes.length}</h6>
                </Col>
                <Col md={4}>
                  <h6><strong>Status</strong>: {selectedPoll && selectedPoll.disabled === true ? "Disabled" : "Active"}</h6>
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
                    {this.props.polls.disableLoading === true ? (
                      <Spinner />
                    ) : (
                      <>
                        {this.toggleButton()}
                      </>
                    )}
                    
                  </Col>
                  <Col md={4}>
                    {this.props.polls.deletePollLoading === true ? <Spinner /> : (
                      <Button
                        variant="danger"
                        onClick={(e) => this.onDelete(selectedPoll._id, e)}
                      >
                        Delete
                      </Button>
                    )}
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
                  <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
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
    console.log( this.state.isActive, " is acti")
    return (
      <div className="mt-5">
        {this.props.polls.disableSuccess === true ? <Alert>Poll successfull disabled</Alert> : null}
        {this.renderView()}
      </div>
    );
  }
}

export default PollDetails;