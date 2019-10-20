import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import SignupForm from './containers/SignupForm';
import Header from './Header';
import Home from './containers/user/Home';
import ErrorPage from './contents/404';
import SigninForm from './containers/SigninForm';
import Admin from './containers/admin/Admin';
import Polls from './containers/user/Polls';
import Auth from "../helpers/Auth";
import { userType } from "../helpers/authenticate";

const PrivateRoute = ( { component: Component, ...rest } ) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() && userType() === "admin" ? (
      <Component {...props} {...rest} />
    ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
  )} />
);



class App extends Component{
  state = {
    title: "", 
  }

  componentDidMount() {
    switch ( window.location.pathname ) {
      case "/":
        return this.setState( { title: "Welcome Home" } );
      case "/user-signup":
        return this.setState( { title: "Sign up as user" } );
      case "/user-login":
        return this.setState( { title: "Log in as user" } );
      case "/settings":
        return this.setState( { title: "Account settings" } );
      default:
        return this.state.title;
    }
    
  }
  
  render() {
    const { title } = this.state;
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={(props) => <Home {...props}/>} />
          <Route path="/user-signup" component={() => <SignupForm title={title} />} />
          <Route path="/user-login" component={() => <SigninForm title={title} />} />
          <Route path="/polls" component={( props ) => <Polls {...props} />} />
          <PrivateRoute path="/dashboard" component={Admin} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
 