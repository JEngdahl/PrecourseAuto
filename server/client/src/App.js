import React, { Component } from "react";

import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from "react-router-dom";

import ClassList from "./ClassList";
import CohortList from "./CohortList";
import Cohort from "./Cohort";
import Student from "./Student";


// import Stuff from "./Stuff";
// import Contact from "./Contact";

class App extends Component {
  render() {
    return (
      <div>

        <div className="navBar">
          <img height="65" src="https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3066/assets/legacy-img/brandguide/logo/hack-reactor-logo-gray-blue.png"/>
          <div className="navText">Student Insights</div>
        </div>
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={ClassList}/>
            <Route exact path="/:campus" component={CohortList}/>
            <Route exact path="/:campus/:cohort" component={Cohort}/>
            <Route exact path="/:campus/:cohort/:student" component={Student}/>
          </Switch>
        </BrowserRouter >

      </div>
    );
  }
}

export default App;
