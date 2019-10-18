import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getPoll, deletePoll, disablePoll } from "../../../../store/actions/actions_polls";
import PollList from './PollList';
import PollDetails from './PollDetails';

class Poll extends Component {
  async componentDidMount() {
    try {
      await this.props.getPoll();
    } catch ( err ) { }
  }
  
  render() {
    const { polls, match } = this.props;
    console.log(match)
    return (
      <div className="poll">
        
        <Switch>
          <Route exact path={`${ match.url }`} component={( props ) => <PollList polls={polls} match={match} {...props} />} />
          <Route path={`${ match.url }/:pollId`}
            component={( props ) =>
              <PollDetails
                polls={polls}
                {...props}
                deletePoll={this.props.deletePoll}
                disablePoll={this.props.disablePoll}
              />
            } />
        </Switch>
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
    getPoll: () => dispatch( getPoll() ),
    deletePoll: ( pollId, token ) => dispatch( deletePoll( pollId, token ) ),
    disablePoll: (user) => dispatch(disablePoll(user))
  }

  return dispatchToProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Poll);
