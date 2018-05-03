import React, { Component } from "react";
import axios from 'axios';
import BASE_URL from './baseUrl';
import {
  NavLink,
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
    axios.get(`${BASE_URL}/api/classlist`)
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
            <NavLink to={"/add"}>
              <li className="campus">+</li>
            </NavLink>
          </ul>
        </div>
    )
  }
}

export default ClassList;
