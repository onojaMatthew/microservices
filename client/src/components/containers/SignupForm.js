import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Signup from "../contents/Signup";
import { Row, Col } from "react-bootstrap";
import { signup } from "../../store/actions/actions_signup";

class SignupForm extends Component{
  state = {
    email: "",
    password: "",
    usertype: "",
    success: false,
  }

  handleChange = ( field, ev ) => {
    let fields = this.state;
    fields[ field ] = ev.target.value;
    this.setState( { fields } );
  }

  onSubmit = async ( e ) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { title, signup } = this.props;
    let userType;

    if ( title.includes( "user" ) ) {
      userType = "tenant";
      this.setState( { usertype: "tenant" } );
    } else {
      userType = "admin";
      this.setState( { usertype: "admin" } );
    }

    const data = {
      email,
      password
    }
    try {
      await signup( data, userType );
    } catch ( err ) {
      return;
    }

    this.setState( { success: this.props.account.isSignupSuccess } );
  }
  
  render() {
    const { signup, title } = this.props;
    const { email, password, success, usertype } = this.state;
    console.log(this.props.account.isSignupSuccess, " props for signup", success)
    if ( this.props.account.isSignupSuccess === true && usertype === "tenant" ) {
      return (<Redirect to="/user-login" />);
    }

    if ( this.props.account.isSignupSuccess === true && usertype === "admin" ) {
      return ( <Redirect to="/admin-login" /> );
    }
    
    return (
      <div className="signupform">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Signup
              signup={signup}
              title={title}
              email={email}
              password={password}
              onSubmit={this.onSubmit}
              handleChange={this.handleChange}
            />
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    signup: (data, userType) => dispatch(signup(data, userType)),
  };

  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( SignupForm );