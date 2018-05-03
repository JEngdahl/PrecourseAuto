import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";

class Home extends Component {
  login = () => this.props.auth.login();

  render() {
    // calls the isAuthenticated method in authentication service
    return (
      <div className="container">
        <Jumbotron className="home">
          <h1>Voltron</h1>
          <p>Log in to get started.</p>
          <p>
            <Button bsStyle="primary" onClick={this.login}>
              Log in
            </Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
