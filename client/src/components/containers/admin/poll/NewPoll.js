import React, { Component } from 'react';
import NewPollForm from '../../../contents/NewPollForm';
import { isAuthenticated } from '../../../../helpers/authenticate';

class NewPoll extends Component {
  state = {
    name: ""
  }

  onSubmit = async ( e ) => {
    e.preventDefault();
    const { createPoll } = this.props;
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const { name } = this.state;
    console.log( "you clicked me for submition" )
    const data = { name };
    try {
      await createPoll( data, userId, token);
    } catch(err) {}
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