import React, { Component } from "react";

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

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
        <BrowserRouter history={history} component={Home}>
          <div>
            <Nav />
            <div className="main">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Home auth={auth} {...props} />}
                />
                <Route
                  exact
                  path="/home"
                  render={props => <Home auth={auth} {...props} />}
                />
                <Route
                  exact
                  path="/callback"
                  render={props => {
                    handleAuthentication(props);
                    return <ClassList {...props} />;
                  }}
                />
                <Route
                  exact
                  path="/add"
                  render={props => {
                    handleAuthentication(props);
                    return <AddClass {...props} />;
                  }}
                />
                <Route
                  exact
                  path="/:campus"
                  render={props => {
                    handleAuthentication(props);
                    return <CohortList {...props} />;
                  }}
                />
                <Route
                  exact
                  path="/:campus/:cohort"
                  render={props => {
                    handleAuthentication(props);
                    return <Cohort {...props} />;
                  }}
                />
                <Route
                  exact
                  path="/:campus/:cohort/:student"
                  render={props => {
                    handleAuthentication(props);
                    return <Student {...props} />;
                  }}
                />
                <Route exact path="/404" component={Err} />
                {/* <Route exact path="/add" component={AddClass} /> */}
                {/* <Route exact path="/:campus" component={CohortList} /> */}
                {/* <Route exact path="/:campus/:cohort" component={Cohort} /> */}
                {/* <Route
                  exact
                  path="/:campus/:cohort/:student"
                  component={Student}
                /> */}
                <Redirect to="/404" />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
