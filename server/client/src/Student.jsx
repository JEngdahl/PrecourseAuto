import React, { Component } from "react";
import axios from "axios";
import {Polar} from 'react-chartjs-2';
import StudentWork from "./StudentWork"

var chart = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3
    ],
    backgroundColor: [
      '#DE7C00',
      '#861F41',
      '#DC4405',
      '#00B398'
    ],
    label: '' // for legend
  }],
  labels: [
    'Koans',
    'Testbuilder',
    'Underbar',
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

  componentDidMount(){
    var p = this.props.location.pathname
    p = p.split("/")
    axios.get("http://34.207.251.58:3000/api/student?s="+p[3])
    .then(res => {
      var student = res.data[0];
      this.setState({student});
      var chartData = {...this.state.chartData};
      chartData.datasets["0"].data = [res.data[0].KoansPercent,res.data[0].TestbuilderPercent,res.data[0].UnderbarPercent,res.data[0].RecursionPercent];
      chartData.datasets["0"].label = res.data[0].FullName;
      this.setState({chartData})
       console.log(this.state)
      // console.log(chartData)
    })
  }

  render(){
    return (
      <div className="studentDashboard">
        <div className="chartContainer">
          <div classname="spacer">
            <Polar className="studentChart" width={500} height={360} data={this.state.chartData}/>
          </div>
          <StudentWork student={this.state.student}/>
        </div>
      </div>
    )
  }
}

export default Student;
