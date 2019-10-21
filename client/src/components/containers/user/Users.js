import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../store/actions/actions_signup";
import UserList from './UserLis';
// import UserList from './UserList';
// import UserDetails from './UserDetails';

class Users extends Component {
  async componentDidMount() {
    const { getUsers } = this.props;
    try {
      await getUsers();
    } catch ( err ) { }
  }

  render() {
    const { match, users, deleteUser } = this.props;
    return (
      <div className="container">
        <UserList match={match} users={users} />
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
    getUsers: () => dispatch( getUsers() ),
    deleteUser: ( userId ) => dispatch( deleteUser( userId ) )
  }

  return dispatchToProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Users );