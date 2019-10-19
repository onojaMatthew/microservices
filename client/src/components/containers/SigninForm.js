import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { signin } from "../../store/actions/actions_signup";
import Signin from "../contents/Signin";

class SigninForm extends Component {
  state = {
    email: "",
    password: "",
    success: false,
    usertype: "",
  }

  handleChange = ( field, ev ) => {
    let fields = this.state;
    fields[ field ] = ev.target.value;
    this.setState( { fields } );
  }

  onSubmit = async ( e ) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { title, signin } = this.props;
    let userType;

    if ( title.includes( "user" ) ) {
      userType = "user";
      this.setState( { usertype: "user" } );
    } else {
      userType = "admin";
      this.setState({ usertype: "admin" })
    }

    const data = {
      email,
      password
    }
    console.log( userType, " de user pe" )
    try {
      await signin( data, userType );  
    } catch ( err ) { 
      return;
    }

    this.setState( { success: this.props.account.isSigninSuccess } );
  }
  render() {
    const { signin, title, } = this.props;
    const { email, password, success, usertype } = this.state;

    if (usertype === "user") {
      return <Redirect to="/settings" />;
    }
    
    if (usertype === "admin") {
      return <Redirect to="/dashboard/index" />;
    }

    return (
      <div className="signupform">
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Signin
              signin={signin}
              title={title}
              email={email}
              password={password}
              onSubmit={this.onSubmit}
              handleChange={this.handleChange}
            />
          </Col>
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
    signin: ( data, userType ) => dispatch( signin( data, userType ) ),
  };

  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( SigninForm );