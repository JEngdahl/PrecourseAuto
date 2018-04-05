import React, { Component } from "react";
import axios from 'axios';
import {
  NavLink,
  HashRouter,
  Route
} from "react-router-dom";

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohorts: []
    };
  }

  componentDidMount() {
    var p = this.props.location.pathname
    axios.get("http://localhost:3000/api/cohorts?c="+p.slice(1,p.length))
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
              <NavLink to={this.props.location.pathname+"/"+e}>
                <li className="cohort">{e}</li>
              </NavLink>
            )}
        </ul>
      </div>
    )
  }
}

export default ClassList;
