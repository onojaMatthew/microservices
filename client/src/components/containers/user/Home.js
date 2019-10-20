import React, { Component } from "react";
import { connect } from "react-redux";
import PollList from "./PollList";
import UserLis from "./UserLis";
import { getUsers } from "../../../store/actions/actions_signup";

class Home extends Component {
  async componentDidMount() {
    const { getPoll, fetchPoll } = this.props;
    try {
      await getPoll();
    } catch(err) {}
  }
  render() {
    const {
      match,
      users,
    } = this.props;
    
    return (
      <div>
        <UserLis users={users} match={match} />
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.account
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchToProps = {
    getUsers: () => dispatch( getUsers() )
  }

  return dispatchToProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Home );