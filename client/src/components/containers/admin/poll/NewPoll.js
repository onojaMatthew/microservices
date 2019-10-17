import React, { Component } from 'react';
import NewPollForm from '../../../contents/NewPollForm';

class NewPoll extends Component {
  render() {
    return (
      <div>
        <h3>Crea new poll</h3>
        <NewPollForm />
      </div>
    );
  }
}

export default NewPoll;