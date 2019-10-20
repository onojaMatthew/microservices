import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import avatar from "../../../assets/images/banner1.jpeg";
import { userType, isAuthenticated } from "../../../helpers/authenticate";
import { getPoll, fetchPoll, likePoll, votePoll } from "../../../store/actions/actions_polls";

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
    } )
  }

  async componentDidMount() {
    const { getPoll } = this.props;
    try {
      await getPoll();
    } catch ( err ) { }

  }

  toggleIsActive = () => {
    this.setState( ( prevState ) => {
      return {
        isActive: !prevState.isActive
      }
    } )
  }


  toggleButton = () => {
    const { isActive } = this.state;
    const { polls, match } = this.props;
    let selectedPoll = polls && polls.polls && polls.polls.length > 0 ? polls.polls.find( poll => poll._id === match.params.pollId ) : null;

    if ( selectedPoll && selectedPoll.disabled === true ) {
      return (
        <Button
          variant="info"
          onClick={( e ) => this.onEnable( selectedPoll._id, e )}
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
      window.location.href = "/dashboard/index/polls";
    } catch ( err ) { }
  }

  onLike = async ( pollId, e ) => {
    e.preventDefault();
    const { likePoll } = this.props;
    try {
      await likePoll( pollId );
    } catch ( err ) { }

  }

  onEnable = async ( pollId, e ) => {
    e.preventDefault();
    const { enablePoll } = this.props;
    try {
      await enablePoll( pollId );
    } catch ( err ) { }

  }

  render() {
    const { polls, match } = this.props;
    let selectedPoll = polls && polls.polls && polls.polls.length > 0 ? polls.polls.find( poll => poll._id === match.params.pollId ) : null;
    const tag = selectedPoll && selectedPoll.tags.map( tag => tag );
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
                    <Button variant="info">Like</Button>
                  </Col>
                  <Col md={4}>
                  <Button variant="primary">Vote</Button>
                  </Col>
                </Row>
              ) : null
            }
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

const mapStateToProps = ( state ) => {
  return {
    polls: state.polls
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchToProps = {
    getPoll: () => dispatch( getPoll ),
    fetchPoll: ( pollId ) => dispatch( fetchPoll( pollId ) ),
    likePoll: ( pollId ) => dispatch( likePoll( pollId ) ),
    votePoll: ( pollId ) => dispatch( votePoll( pollId ) )
  }

  return dispatchToProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails);