import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";

function getGreenToRed(arr){
  let nonNull = arr.reduce(function(a,e){
    if(e){
      if(e>100){
        a+=100
      }else{
        a+=e
      }
    }
    return a
  },0)

  var percent = nonNull / 5;
  var r = percent<50 ? 255 : Math.round(255-(percent*2-100)*255/100);
  var g = percent>50 ? 255 : Math.round((percent*2)*255/100);
  return ['rgb('+r+','+g+',0)',percent];
}

class Cohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      value: 'alpha',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var getPercent = function(arr){
      let nonNull = arr.reduce(function(a,e){
        if(e){
          if(e>100){
            a+=100
          }else{
            a+=e
          }
        }
        return a
      },0)
      return nonNull
    }
    var students = [...this.state.students];
    if(event.target.value === "alpha"){
      students = students.sort(function(a, b) {
        return a.FullName < b.FullName ? -1 : 1;
      })
    }
    if(event.target.value === "percent"){
      students = students.sort(function(a, b) {
          return getPercent([b.RecursionPercent,b.TestbuilderPercent,b.KoansPercent,b.UnderbarOnePercent,b.UnderbarTwoPercent]) - getPercent([a.RecursionPercent,a.TestbuilderPercent,a.KoansPercent,a.UnderbarOnePercent,a.UnderbarTwoPercent]);
      })
    }

    this.setState({students})
    this.setState({value: event.target.value})
  }

  componentDidMount(){
    var p = this.props.location.pathname
    p = p.split("/")
    axios.get("http://35.173.188.239:3000/api/class?c="+p[2])
    .then(res => {
      var students = res.data
      this.setState({students})
    })
  }

  render(){
    let filteredStudents = this.state.students
    return (
      <div className="selectorContainer">

        <form>
          <select value={this.state.value} onChange={this.handleChange}>
            <option default value="alpha">A-Z</option>
            <option value="percent">Completion</option>
          </select>
        </form>

        <ul className="studentRowContainer">
          {filteredStudents.map(e =>
              <NavLink to={this.props.location.pathname+"/"+e.GithubName}>
                <li className="studentRow" >
                  <div className="dataPoint indicator" style={{backgroundColor: getGreenToRed([e.RecursionPercent,e.TestbuilderPercent,e.KoansPercent,e.UnderbarOnePercent,e.UnderbarTwoPercent])[0]}}></div>
                  <div className="dataPoint left" >{e.FullName.slice(0,20) || "N/A"}</div>
                  <div className="dataPoint">Total: %{Math.round(getGreenToRed([e.RecursionPercent,e.TestbuilderPercent,e.KoansPercent,e.UnderbarOnePercent,e.UnderbarTwoPercent])[1])}</div>
                  <div className="dataPoint" >Koans: %{Math.round(e.KoansPercent / 2 ) || "N/A"}</div>
                  <div className="dataPoint" >Testbuilder: %{e.TestbuilderPercent || "N/A"}</div>
                  <div className="dataPoint" >Underbar One: %{e.UnderbarOnePercent || "N/A"}</div>
                  <div className="dataPoint" >Underbar Two: %{e.UnderbarTwoPercent || "N/A"}</div>
                  <div className="dataPoint" >Recursion: %{e.RecursionPercent || "N/A"}</div>
                  <div className="dataPoint" >
                    { (()=>{
                        if(Boolean(Number(e.Twittler))){
                          return "Twittler: ✅"
                        }
                        else{
                          return "Twittler: ❌"
                        }
                      })()

                    }
                  </div>
                </li>
              </NavLink>
          )}
        </ul>
      </div>
    )
  }
}

export default Cohort;
