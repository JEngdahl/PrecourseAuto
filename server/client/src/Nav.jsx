import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Nav extends Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth
    console.log("props", this.props);
    return (
      <div className="navBar">
        <Link to="/">
          <img
            height="65"
            src="https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3066/assets/legacy-img/brandguide/logo/hack-reactor-logo-gray-blue.png"
            alt="Hack Reactor"
          />
        </Link>
        <div className="navText">{
          isAuthenticated() ?
          <a onClick={this.logout} style={{ cursor: 'pointer' }}>
            Logout
          </a> :
          <a onClick={this.login} style={{ cursor: 'pointer' }}>
            Login
          </a> 
        }
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
