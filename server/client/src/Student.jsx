import React, { Component } from "react";
import axios from "axios";
import {Polar} from 'react-chartjs-2';
import StudentWork from "./StudentWork"
import StudentNotes from "./StudentNotes"

var chart = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3,
      7
    ],
    backgroundColor: [
      '#DE7C00',
      '#861F41',
      '#DC4405',
      '#00B398',
      '#522555'
    ],
    label: '' // for legend
  }],
  labels: [
    'Koans',
    'Testbuilder',
    'Underbar One',
    'Underbar Two',
    'Recursion'
  ],
  // options: {
  //   // responsive: true,
  //   // maintainAspectRatio: true
  //   }
};

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: [],
      chartData: chart,
    };
  }

  componentWillMount(){
    var p = this.props.location.pathname
    p = p.split("/")
    axios.get("http://35.173.188.239:3000/api/student?s="+p[3])
    .then(res => {
      var student = res.data[0];
      var chartData = {...this.state.chartData};
      chartData.datasets["0"].data = [res.data[0].KoansPercent||0,res.data[0].TestbuilderPercent||0,res.data[0].UnderbarOnePercent||0,res.data[0].UnderbarTwoPercent||0,res.data[0].RecursionPercent||0];
      chartData.datasets["0"].label = res.data[0].FullName;
      this.setState({chartData, student})
       console.log(this.state)
       console.log("cd",chartData)
    })
  }

  render(){
    return (
      <div className="studentDashboard">
        <div className="chartContainer">
          <div classname="spacer">
            <Polar className="studentChart" width={500} height={360} data={this.state.chartData}/>
          </div>
          <div className="studentWorkWrapper">
            <StudentWork student={this.state.student}/>
            <StudentNotes student={this.state.student}/>
          </div>
      </div>
      </div>
    )
  }
}

export default Student;
