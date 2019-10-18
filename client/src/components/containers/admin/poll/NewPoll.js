import React, { Component } from 'react';
import NewPollForm from '../../../contents/NewPollForm';

class NewPoll extends Component {
  state = {
    name: ""
  

  onSubmit = ( ) => {

    e.preventDefault();
    console.log("you clicked me for submition")
  }

  handleChange = (field, e) => {
    let fields = this.state;
    fields[field] = e.target.value;
    this.setState( { fields } );
    console.log( this.state );
  }
  render() {
    const { name } = this.state;
    return (
      <div>
        <NewPollForm
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
          name={name}
        />
      </div>
    );
  }
}

export default NewPoll;