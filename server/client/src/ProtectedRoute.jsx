import React from 'react';
import {Route, Redirect} from 'react-router';

class ProtectedRoute extends React.Component {

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  render() {
    const { component: Component } = this.props
    const { isAuthenticated } = this.props.auth;

    return (
      <Route 
        render={props => (
          isAuthenticated() ?
            <Component {...this.props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}

export default ProtectedRoute;