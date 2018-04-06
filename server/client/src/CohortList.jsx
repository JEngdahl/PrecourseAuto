import React, { Component } from "react";
import axios from 'axios';
import {
  NavLink,
  HashRouter,
  Route
} from "react-router-dom";
import ExportCSV from "./ExportCSV.jsx"

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohorts: []
    };
  }

  componentDidMount() {
    var p = this.props.location.pathname
    axios.get("http://35.173.188.239:3000/api/cohorts?c="+p.slice(1,p.length))
    .then(res => {
      var cohorts = res.data
      this.setState({cohorts})
    })
  }

  render(){
    return (
      <div >
        <ul className="cohortList">
          {this.state.cohorts.map(e =>
              <li className="cohort">
                <NavLink to={this.props.location.pathname+"/"+e}>
                  {e}
                </NavLink>
                <ExportCSV class={e} />
              </li>
            )}
        </ul>
      </div>
    )
  }
}

export default ClassList;
