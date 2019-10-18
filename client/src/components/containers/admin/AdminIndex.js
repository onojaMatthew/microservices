import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Banner from './Banner';
import NewPoll from './poll/NewPoll';
import { createPoll, getPoll } from '../../../store/actions/actions_polls';

class AdminIndex extends Component {
  render() {
    const { createPoll } = this.props;
    return (
      <div>
        <Banner />
        <hr />
        <Row className="justify-content-md-center">
          <NewPoll createPoll={createPoll} />
        </Row>
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
    createPoll: ( data, userId, token ) => dispatch( createPoll( data, userId, token ) ),
    getPoll: () => dispatch(getPoll())
  }

  return dispatchToProps;
}
 
export default connect( mapStateToProps, mapDispatchToProps)(AdminIndex);
