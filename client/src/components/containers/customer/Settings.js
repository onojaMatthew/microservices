import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { upload } from "../../../store/actions/uploads";
import CustomerForm from "../../contents/CustomerForm";
import FormData from "form-data";

class Settings extends Component {
  state = {
    caption: "",
    image: "",
    success: false,
    usertype: "",
  }

  handleChange = ( ev ) => {
    let fields = this.state;

    // console.log(ev.target.files[0])
    const value = ev.target.name === "image" ? ev.target.files[0] : ev.target.value;
    fields[ ev.target.name ] = value;
    this.setState( { fields } );
    console.log(this.state, " this is the state")
  }

  onSubmit = async ( e ) => {
    e.preventDefault();
    const { image, caption } = this.state;
    const { upload } = this.props;
    let formData = new FormData();
    formData.append( "image", image );
    // const data = {  }
    try {
      await upload( formData );

    } catch ( err ) {
      return;
    }

  }
  render() {
    const { title, } = this.props;
    const { caption, image, success, usertype } = this.state;

    return (
      <div className="signupform">
        <Row className="justify-content-md-center">
          <Col md={4}>
            <CustomerForm
              title={title}
              caption={caption}
              photo={image}
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
    upload: state.upload
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    upload: ( data ) => dispatch( upload( data ) ),
  };

  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Settings );