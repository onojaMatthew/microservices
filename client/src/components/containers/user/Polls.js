import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { getPoll, fetchPoll, votePoll, likePoll, postComment } from "../../../store/actions/actions_polls";
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
      likePoll,
      votePoll,
      postComment
    } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path={`${ match.url }`} component={() => <PollList polls={polls} match={match} />} />
          <Route
            path={`${ match.url }/:pollId`}
            component={( props ) =>
              <PollDetails
                polls={polls}
                {...props}
                votePoll={votePoll}
                likePoll={likePoll}
                postComment={postComment}
              />
            } />
        </Switch>
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
    fetchPoll: ( pollId ) => dispatch( fetchPoll( pollId ) ),
    votePoll: ( pollId ) => dispatch( votePoll( pollId ) ),
    likePoll: ( pollId ) => dispatch( likePoll( pollId ) ),
    postComment: ( data, pollId ) => dispatch( postComment( data, pollId))
  }

  return dispatchToProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Polls );