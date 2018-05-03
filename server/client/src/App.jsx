import React, { Component } from "react";

import { Route, Router, Switch, Redirect } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ClassList from "./ClassList";
import CohortList from "./CohortList";
import Cohort from "./Cohort";
import Student from "./Student";
import AddClass from "./AddClass";
import Err from "./Err";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import history from "./Auth/history";
import Home from "./Home";
import Callback from "./Callback";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history} >
          <div>
            <Nav auth={auth} />
            <div className="main">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Home auth={auth} {...props} />}
                />
                <Route
                  exact
                  path="/callback"
                  render={props => {
                    handleAuthentication(props);
                    return <Callback {...props}/>;
                  }}
                />
                <ProtectedRoute
                  exact
                  auth={auth}
                  path="/classlist"
                  component={ClassList}
                />
                <ProtectedRoute
                  exact
                  auth={auth}
                  path="/add"
                  component={AddClass}
                />
                <ProtectedRoute
                  exact
                  auth={auth}
                  path="/:campus"
                  component={CohortList}
                />
                <ProtectedRoute
                  exact
                  auth={auth}
                  path="/:campus/:cohort"
                  component={Cohort}
                />
                <ProtectedRoute
                  exact
                  auth={auth}
                  path="/:campus/:cohort/:student"
                  component={Student}
                /> 
                <Route exact path="/404" component={Err} />
                <Redirect to="/404" />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
