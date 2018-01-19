import React, { Component } from "react";
import axios from 'axios';

class Cohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: []
    };
  }

  componentDidMount(){
    var p = this.props.location.pathname
    p = p.split("/")
    axios.get("http://localhost:3000/api/class?c="+p[2])
    .then(res => {
      var students = res.data
      this.setState({students})
    })
  }

  render(){
    console.log(this.state.students)
    return (
      <div className="masterWrapper">
        {this.state.students.map(e =>
          <ul className="studentRowContainer">
            <li className="studentRow">
              <div className="dataPoint" >{e.FullName || "N/A"}</div>
              <div className="dataPoint" >Koans: {e.Koans || "N/A"}</div>
              <div className="dataPoint" >Testbuilder: {e.Testbuilder || "N/A"}</div>
              <div className="dataPoint" >Underbar: {e.UnderbarOne || "N/A"}</div>
              <div className="dataPoint" >Recursion: {e.Recursion || "N/A"}</div>
              <div className="dataPoint" >Twittler</div>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default Cohort;
