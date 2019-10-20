import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPoll, fetchPoll, votePoll, likePoll } from "../../../store/actions/actions_polls";
import PollList from "./PollList";
import PollDetails from "./PollDetails";

class Polls extends Component {
  async componentDidMount() {
    const { getPoll, fetchPoll } = this.props;
    try {
      await getPoll();
      // await fetchPoll()
    } catch ( err ) { }
  }
  render() {
    const {
      match,
      polls,
    } = this.props;

    return (
      <div>
        <PollList polls={polls} match={match}/>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    polls: state.polls
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchToProps = {
    getPoll: () => dispatch( getPoll() ),
    fetchPoll: ( pollId ) => dispatch( fetchPoll( pollId ) )
  }

  return dispatchToProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Polls );