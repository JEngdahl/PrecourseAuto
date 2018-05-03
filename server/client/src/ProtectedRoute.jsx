import React from 'react';
import {Route, Redirect} from 'react-router';

class ProtectedRoute extends React.Component {

  constructor(props) {
    super(props)
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  render() {
    const { component: Component, ...props } = this.props
    const { isAuthenticated } = this.props.auth;

    return (
      <Route 
        render={props => (
          isAuthenticated() ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}

export default ProtectedRoute;