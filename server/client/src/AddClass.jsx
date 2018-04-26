import React, { Component } from "react";
import axios from "axios"
import BASE_URL from "./baseUrl";

class AddClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      names: '',
      handles: '',
      cohort: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addClass = this.addClass.bind(this);
  }

  addClass(){
    console.log("Firing the Missile")
    axios.post(`${BASE_URL}/api/addclass`, {
    ...this.state
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addClass();
  }

  render(){
    return (
      <div className="addCohort">
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2>
            Names:
            </h2>
            <textarea
              name="names"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </label>
          <label>
            <h2>
            GH handles:
            </h2>
            <textarea
              name="handles"
              value={this.state.handles}
              onChange={this.handleInputChange} />
          </label>
          <label>
            <h2>
            Cohort:
            </h2>
            <input
              name="cohort"
              type="input"
              value={this.state.cohort}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddClass;
