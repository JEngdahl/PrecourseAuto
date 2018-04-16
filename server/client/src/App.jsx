import React, { Component } from "react";

import {
  Route,
  BrowserRouter,
  Switch,
  Redirect
} from "react-router-dom";

import ClassList from "./ClassList";
import CohortList from "./CohortList";
import Cohort from "./Cohort";
import Student from "./Student";
import AddClass from "./AddClass"
import Err from "./Err"
import Nav from "./Nav"

class App extends Component {
  render() {
    return (
      <div>

        <BrowserRouter >
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/" component={ClassList}/>
              <Route exact path="/404" component={Err} />
              <Route exact path="/add" component={AddClass}/>
              <Route exact path="/:campus" component={CohortList}/>
              <Route exact path="/:campus/:cohort" component={Cohort}/>
              <Route exact path="/:campus/:cohort/:student" component={Student}/>
              <Redirect to="/404" /> 
            </Switch>
          </div>
        </BrowserRouter >

      </div>
    );
  }
}

export default App;
