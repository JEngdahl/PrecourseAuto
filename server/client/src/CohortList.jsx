import React, { Component } from "react";
import axios from 'axios';
import {
  NavLink,
  HashRouter,
  Route,
  Redirect
} from "react-router-dom";
import ExportCSV from "./ExportCSV.jsx"

class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohorts: [],
      redirect : false 
    };
  }

  componentDidMount() {
    var p = this.props.location.pathname
    axios.get("http://35.173.188.239:3000/api/cohorts?c="+p.slice(1,p.length))
    .then(res => {
      if (res.data.length < 1 ) {
        this.setState({redirect : true});
      }
      var cohorts = res.data
      this.setState({cohorts})
    }).catch(err => {
      this.setState({redirect : true});
    })  
  }

  render(){
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/404'/>;
    }

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
