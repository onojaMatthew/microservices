import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import banner from "../../../assets/images/banner1.jpeg"
import Banner from './Banner';
import NewPoll from './poll/NewPoll';
import { createPoll } from '../../../store/actions/actions_polls';

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

const mapDispatchToProps = ( dispatch ) => {
  const dispatchToProps = {
    createPoll: ( data) => dispatch(createPoll(data))
  }

  return dispatchToProps;
}
 
export default connect( null, mapDispatchToProps)(AdminIndex);
