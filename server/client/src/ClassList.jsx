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
      classes: [],
      campus: []
    };
  }
  componentDidMount() {
    axios.get("http://34.207.251.58:3000/api/classlist")
    .then(res => {

      const classes = res.data.split(" ").sort()

      const campus = classes.reduce((a,e)=>{
        e = e.replace(/[0-9]/g, '');
        if(!a.includes(e)){
          a.push(e)
        }
        return a
      },[])


      this.setState({classes})
      this.setState({campus})
    })
  }

  render(){
    return (
        <div >
          <ul className="campusList">
            {this.state.campus.map(e =>
                <NavLink to={"/"+e}>
                  <li className="campus">{e}</li>
                </NavLink>
              )}
          </ul>
        </div>
    )
  }
}

export default ClassList;
